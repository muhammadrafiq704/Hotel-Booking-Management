import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({ quiet: true });

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("Stripe secret key missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log('stripe :>> ', stripe);
export const createPaymentIntent = async ({ amount, bookingId }) => {
	return await stripe.paymentIntents.create({
		amount: amount * 100, // cents
		currency: "pkr",
		metadata: {
			bookingId: bookingId.toString(),
		},
	});
};
