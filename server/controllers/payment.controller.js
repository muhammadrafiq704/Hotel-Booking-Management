import Booking from "../models/booking.model.js";
import { createPaymentIntent } from "../services/stripe.service.js";

export const createPayment = async (req, res) => {
	try {
		const { bookingId } = req.body;
		console.log("bookingId :>> ", bookingId);

		const booking = await Booking.findById(bookingId);
		console.log("booking :>> ", booking);
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

		const paymentIntent = await createPaymentIntent({
			amount: booking.totalPrice,
			bookingId: booking._id,
		});
		console.log("paymentIntent :>> ", paymentIntent);

		res.json({
			error: false,
			message: "Payment intent created successfully",
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log("Error in createPayment :>> ", error);
		res.status(500).json({ error: true, message: error.message });
	}
};

export const stripeWebhook = async (req, res) => {
	const event = req.body;
	// console.log('event :>> ', event);
	try {
		if (event.type === "payment_intent.succeeded") {
			const bookingId = event.data.object.metadata.bookingId;

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
