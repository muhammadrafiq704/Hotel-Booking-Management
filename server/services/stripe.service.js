import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({ quiet: true });

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("Stripe secret key missing in .env");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async ({
	amount,
	bookingId,
	// roomTitle,
}) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		ui_mode: "embedded_page",
		mode: "payment",
		line_items: [
			{
				price_data: {
					currency: "pkr",
					product_data: {
						name: "Room Title",
					},
					unit_amount: amount * 100,
				},
				quantity: 1,
			},
		],
		metadata: {
			bookingId: bookingId.toString(),
		},
		return_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
		// success_url: `${process.env.CLIENT_URL}/success`,
		// cancel_url: `${process.env.CLIENT_URL}/cancel`,
	});

	return {
		sessionId: session.id,
		clientSecret: session.client_secret,
	};
};
