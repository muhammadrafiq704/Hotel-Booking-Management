import { Box } from "@mui/material";
import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import { Container } from "@/components";
import PageLayout from "@/layout/PageLayout";
import { stripePromise } from "@/lib/stripe";

const Booking = () => {
	const { data } = useLoaderData() as {
		data: {
			clientSecret: string;
			bookingId: string;
		};
	};

	const clientSecret = data?.clientSecret;

	if (!clientSecret) return <div>Loading...</div>;

	return (
		<PageLayout title="Booking Confirmation">
			<Container>
				<Box py={10}>
					<EmbeddedCheckoutProvider
						stripe={stripePromise}
						options={{
							clientSecret: data.clientSecret,
						}}
					>
						<EmbeddedCheckout />
					</EmbeddedCheckoutProvider>
				</Box>
			</Container>
		</PageLayout>
	);
};

export default Booking;
