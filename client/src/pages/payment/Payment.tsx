import { Box } from "@mui/material";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import {
	useLoaderData,
	// useSubmit,
} from "react-router-dom";
import { Container } from "@/components";
import PageLayout from "@/layout/PageLayout";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";

const Booking = () => {
	const { data } = useLoaderData() as {
		data: { clientSecret: string; bookingId: string };
		bookingId: string;
	};
	// console.log("data at payment :>> ", bookingId, clientSecret);
	console.log("data :>> ", data);
	const clientSecret = data.clientSecret;

	return (
		<PageLayout title="Booking Confirmation">
			<Container>
				<Box py={10}>
					<Box py={10}>
						<CheckoutElementsProvider
							stripe={stripePromise}
							options={{
								clientSecret,
							}}
						>
							<CheckoutForm />
						</CheckoutElementsProvider>
					</Box>
				</Box>
			</Container>
		</PageLayout>
	);
};

export default Booking;
