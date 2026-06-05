import Booking from "../models/booking.model.js";
import { createCheckoutSession } from "../services/stripe.service.js";

export const createPayment = async (req, res) => {
	try {
		const { bookingId } = req.params;
		console.log("bookingId :>> ", bookingId);

		const booking = await Booking.findById(bookingId);
		console.log("booking at payment:>> ", booking);
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
			roomTitle: room.title,
		});

		console.log("checkoutSession :>> ", checkoutSession);

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
	const event = req.body;
	console.log("event :>> ", event);
	try {
		if (event.type === "payment_intent.succeeded") {
			const bookingId = event.data.object.metadata.bookingId;
			console.log("bookingId :>> ", event.data.object.metadata.bookingId);

			await Booking.findByIdAndUpdate(bookingId, {
				status: "confirmed",
				"payment.status": "paid",
				isActive: true,
			});
		}

		if (event.type === "payment_intent.payment_failed") {
			const bookingId = event.data.object.metadata.bookingId;

			await Booking.findByIdAndUpdate(bookingId, {
				status: "cancelled",
				isActive: false,
				"payment.status": "failed",
			});
		}

		res.json({ received: true });
	} catch (err) {
		console.log("Error in stripeWebhook :>> ", err);
		res.status(500).json({ error: true, message: err.message });
	}
};
