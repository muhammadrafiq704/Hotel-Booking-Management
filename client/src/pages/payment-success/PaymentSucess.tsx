import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Container } from "@/components";
import PageLayout from "@/layout/PageLayout";
import { formatDate } from "@/lib/formateDate";
import type { Booking } from "@/types/types";

export type PaymentVerifyResponse = {
	paid: boolean;
	booking: Booking | null;
};

const PaymentSuccess = () => {
	const data = useLoaderData() as {
		result: Promise<PaymentVerifyResponse>;
	};

	function Loading() {
		return (
			<PaymentSuccessWrapper>
				<CircularProgress />
				<Typography mt={2}>Verifying payment...</Typography>
			</PaymentSuccessWrapper>
		);
	}

	return (
		<Suspense fallback={<Loading />}>
			<Await resolve={data.result}>
				{(res: PaymentVerifyResponse) => {
					console.log("res :>> ", res);
					if (!res.paid || !res.booking) {
						return <InvalidSession />;
					}
					return (
						<PaymentSuccessWrapper>
							<Grid container spacing={2}>
								<Grid size={12} mb={2}>
									<Typography variant="h4" color="green" textAlign="center">
										🎉 Payment Successful/Booking Detail 🎉
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Customer Name:</strong> {res.booking.customerName}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Customer Email:</strong> {res.booking.customerEmail}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Check In Date:</strong>{" "}
										{formatDate(res.booking.checkIn)}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Check Out Date:</strong>{" "}
										{formatDate(res.booking.checkOut)}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Room Number:</strong> {res.booking.room.roomNumber}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Room Type:</strong> {res.booking.room.type}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Total Nights:</strong> {res.booking.totalNights}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Total Price Per Night:</strong>{" "}
										{res.booking.pricePerNight}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Total Price:</strong> {res.booking.totalPrice}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Booker Name:</strong> {res.booking.user.username}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography>
										<strong>Booked Email:</strong> {res.booking.user.email}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography color="success" fontStyle="italic">
										<strong>Booking Status:</strong> {res.booking.status}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 4, md: 6 }}>
									<Typography color="success" fontStyle="italic">
										<strong>Payment Status:</strong>{" "}
										{res.booking.payment.status}
									</Typography>
								</Grid>
							</Grid>
						</PaymentSuccessWrapper>
					);
				}}
			</Await>
		</Suspense>
	);

	function InvalidSession() {
		return (
			<PaymentSuccessWrapper>
				<Typography color="error">
					Payment not completed or invalid session
				</Typography>
			</PaymentSuccessWrapper>
		);
	}
};

export default PaymentSuccess;

function PaymentSuccessWrapper({ children }: { children: React.ReactNode }) {
	return (
		<PageLayout title="Payment and Booking Confirmed">
			<Container sx={{ mt: 4 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						p: 4,
						border: "1px dashed gray",
						borderRadius: "20px",
						bgcolor: "#DCE5E9",
					}}
				>
					{children}
				</Box>
			</Container>
		</PageLayout>
	);
}
