import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container, NotFound } from "@/components";
import BookingCard from "@/components/card/BookingCard";
import PageLayout from "@/layout/PageLayout";
import { bookings } from "./config";

const Bookings = () => {
	// const { data } = useLoaderData() as {
	// 	data: Room;
	// 	error: boolean;
	// message: string
	// };

	return (
		<PageLayout
			title="Bookings"
			description="All bookings here only which completed their payments."
		>
			<Container>
				<Box py={10}>
					<Typography mb={3}>
						If You are not logged in?
						<Link to="/login">Click here to login in</Link>
					</Typography>
					<Grid container spacing={6} mt={4} sx={{ width: "100%" }}>
						{bookings === undefined || bookings.length === 0 ? (
							<Grid size={12}>
								<NotFound message="Bookings not found" />
							</Grid>
						) : (
							bookings.slice(0, 6).map((booking, index) => (
								<Grid key={booking._id} size={{ xs: 12, sm: 12, md: 12 }}>
									<BookingCard
										index={index}
										orientation="vertical"
										booking={booking}
									/>
								</Grid>
							))
						)}
					</Grid>
				</Box>
			</Container>
		</PageLayout>
	);
};

export default Bookings;
