import Booking from "../models/booking.model.js";
import { createCheckoutSession, stripe } from "../services/stripe.service.js";

export const createPayment = async (req, res) => {
	try {
		const { bookingId } = req.params;
		// console.log("bookingId :>> ", bookingId);

		const booking = await Booking.findById(bookingId);
		// console.log("booking at payment:>> ", booking);
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

		// console.log("checkoutSession :>> ", checkoutSession);

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

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		console.log("Webhook:", event.type);

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			const bookingId = session.metadata.bookingId;

			await Booking.findByIdAndUpdate(bookingId, {
				status: "confirmed",
				"payment.status": "paid",
				isActive: true,
			});
		}

		if (event.type === "checkout.session.expired") {
			const session = event.data.object;

			await Booking.findByIdAndUpdate(session.metadata.bookingId, {
				status: "cancelled",
				"payment.status": "failed",
				isActive: false,
			});
		}

		return res.json({ received: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true });
	}
};

// controllers/paymentController.js
export const verifyCheckoutSession = async (req, res) => {
	// console.log("req.params.sessionId :>> ", req.params.sessionId);
	try {
		const sessionId = req.params.sessionId;

		const session = await stripe.checkout.sessions.retrieve(sessionId);

		const bookingId = session.metadata.bookingId;

		const booking = await Booking.findById(bookingId);

		return res.json({
			paid: session.payment_status === "paid",
			booking,
		});
	} catch (err) {
		console.log("Error in verifyCheckoutSession", err);
		res.status(500).json({ error: true, message: err.message });
	}
};
