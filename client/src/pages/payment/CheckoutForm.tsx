// CheckoutForm.tsx

import { Button } from "@mui/material";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setLoading(true);

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment-success`,
			},
		});

		setLoading(false);

		if (result.error) {
			console.log(result.error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />

			<Button
				fullWidth
				variant="contained"
				type="submit"
				disabled={!stripe || loading}
			>
				{loading ? "Processing..." : "Pay Now"}
			</Button>
		</form>
	);
};

export default CheckoutForm;
