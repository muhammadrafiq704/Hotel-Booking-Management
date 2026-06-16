import Booking from "../models/booking.model.js";
import { createCheckoutSession, stripe } from "../services/stripe.service.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createPayment = async (req, res) => {
	try {
		const { bookingId } = req.params;

		const booking = await Booking.findById(bookingId);
		if (!booking) {
			return res
				.status(404)
				.json({ error: true, message: "Booking not found" });
		}

		if (booking.status !== "pending") {
			return res
				.status(400)
				.json({ error: true, message: "Booking not payable" });
		}

		const checkoutSession = await createCheckoutSession({
			amount: booking.totalPrice,
			bookingId: booking._id,
			// roomTitle: room.title,
		});

		res.json({
			error: false,
			message: "Payment intent created successfully",
			data: {
				bookingId: booking._id,
				clientSecret: checkoutSession.clientSecret,
			},
		});
	} catch (error) {
		console.log("Error in createPayment :>> ", error);
		res.status(500).json({ error: true, message: error.message });
	}
};

export const stripeWebhook = async (req, res) => {
	const sig = req.headers["stripe-signature"];
	let event;

	// verify stripe signature
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		console.log("❌ Webhook signature error:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			const bookingId = session.metadata?.bookingId;

			if (!bookingId) {
				console.log("❌ Missing bookingId in metadata");
				return res.json({ received: true });
			}

			// Update booking
			const booking = await Booking.findByIdAndUpdate(
				bookingId,
				{
					status: "confirmed",
					"payment.status": "paid",
					isActive: true,
				},
				{ new: true },
			).populate("room user");

			if (!booking) {
				console.log("❌ Booking not found:", bookingId);
				return res.json({ received: true });
			}

			try {
				await sendEmail({
					to: booking.customerEmail,
					booking,
				});

				console.log(
					"📧 Confirmation email sent suceeful after booking update by stripe webhook",
				);
			} catch (err) {
				console.log("❌ Email error:", err.message);
			}
		}

		if (event.type === "checkout.session.expired") {
			const session = event.data.object;
			const bookingId = session.metadata?.bookingId;

			if (!bookingId) return res.json({ received: true });

			await Booking.findByIdAndUpdate(
				bookingId,
				{
					status: "cancelled",
					"payment.status": "failed",
					isActive: false,
				},
				{ new: true },
			);

			console.log("⚠️ Booking cancelled due to expired session");
		}

		return res.json({ received: true });
	} catch (err) {
		console.log("❌ Webhook handler error:", err);
		return res.status(500).json({ error: true });
	}
};

export const verifyCheckoutSession = async (req, res) => {
	try {
		const sessionId = req.params.sessionId;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		const bookingId = session.metadata.bookingId;
		const booking = await Booking.findById(bookingId).populate("room user");

		if (!booking) {
			return res
				.status(404)
				.json({ error: true, message: "Booking not found" });
		}

		return res.json({
			paid: session.payment_status === "paid",
			booking,
		});
	} catch (err) {
		console.log("Error in verifyCheckoutSession", err);
		res.status(500).json({ error: true, message: err.message });
	}
};
