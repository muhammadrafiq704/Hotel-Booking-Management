import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

type BookingProps = {
	_id: string;
	status: string;
};

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const [status, setStatus] = useState("loading");
	const [booking, setBooking] = useState<BookingProps>();
	useEffect(() => {
		const verify = async () => {
			try {
				if (!sessionId) {
					setStatus("invalid");
					return;
				}

				const res = await HBMSApi.get(`/payments/verify-session/${sessionId}`);

				console.log("res :>> ", res);
				console.log("res.data :>> ", res.data);
				const data = await res.data;

				if (data.paid) {
					setStatus("success");
					setBooking(data.booking);
				} else {
					setStatus("failed");
				}
			} catch (err) {
				console.error("Error in payment success", err);
				setStatus("failed");
			}
		};

		verify();
	}, [sessionId]);

	if (status === "loading") {
		return (
			<Box textAlign="center" mt={10}>
				<CircularProgress />
				<Typography mt={2}>Verifying payment...</Typography>
			</Box>
		);
	}

	if (status === "success") {
		return (
			<Box textAlign="center" mt={10}>
				<Typography variant="h4" color="green">
					Payment Successful 🎉
				</Typography>

				{booking && (
					<>
						<Typography>Booking ID: {booking._id}</Typography>
						<Typography>Status: {booking.status}</Typography>
					</>
				)}
			</Box>
		);
	}

	return (
		<Box textAlign="center" mt={10}>
			<Typography color="error">
				Payment not completed or invalid session
			</Typography>
		</Box>
	);
};

export default PaymentSuccess;
