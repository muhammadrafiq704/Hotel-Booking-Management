import { Box, Chip, Grid, Tooltip, Typography, Zoom } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { CChip, Container, NotFound } from "@/components";
import SwiperComponent from "@/components/slider/Swiper";
import CTypography from "@/components/typography/CTypography";
import PageLayout from "@/layout/PageLayout";
import { formatDate } from "@/lib/formateDate";
import { bookingsDetails } from "../config";

const BookingsDetails = () => {
	const params = useParams();
	const id = params.id;
	// const { data } = useLoaderData() as {
	// 	data: Room;
	// 	error: boolean;
	// };
	const booking = bookingsDetails.find((booking) => booking._id === id);

	console.log("booking :>> ", booking);

	return (
		<PageLayout
			title="Bookings"
			description="All bookings here only which completed their payments."
		>
			<Container>
				<Box py={10}>
					<Typography mb={3}>
						If You are not logged in?
						<Link to="/login"> Click here to login in </Link>
						Need login before booking
					</Typography>
					<Grid container spacing={6} mt={4} sx={{ width: "100%" }}>
						{booking === undefined ? (
							<Grid size={12}>
								<NotFound message="Booking not found" />
							</Grid>
						) : (
							<>
								<Grid size={{ xs: 12, sm: 6 }} sx={{ position: "relative" }}>
									<Box
										sx={{
											height: { xs: 200, sm: 350 },
										}}
									>
										<SwiperComponent images={booking.room.images} />
									</Box>
									{booking?.status !== "confirmed" &&
									booking.payment.status === "paid" ? (
										<Chip
											label="Available"
											sx={{
												backdropFilter: "blur(8px)",
												backgroundColor: "rgba(255, 255, 255, 0.3)",
												WebkitBackdropFilter: "blur(12px)",
												position: "absolute",
												color: "#fff",
												fontWeight: 500,
												// top: 16,
												zIndex: 1,
												left: 10,
											}}
										/>
									) : (
										<Chip
											label="Booked"
											sx={{
												backdropFilter: "blur(8px)",
												backgroundColor: "rgba(23, 109, 1, 0.5)",
												WebkitBackdropFilter: "blur(12px)",
												position: "absolute",
												color: "#fff",
												fontWeight: 500,
												top: 16,
												zIndex: 1,
												left: 10,
											}}
										/>
									)}
								</Grid>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Box
										sx={{
											display: "flex",
											// justifyContent: "center",
											// alignItems: "center",
											flexDirection: "column",
											// p: 4,
											// border: "1px dashed gray",
											// borderRadius: "20px",
											// bgcolor: "#DCE5E9",
											gap: 1,
										}}
									>
										<Typography fontWeight={600} variant="h6">
											{booking.room.title}
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px dashed gray",
												borderRadius: "12px",
												bgcolor: "#DCE5E9",
												px: 2,
												py: 1,
												gap: 1,
												mb: 2,
											}}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Typography fontWeight={500} variant="body1">
													Room Number: {booking.room.roomNumber}
												</Typography>
												<Typography fontWeight={500} variant="body1">
													Room Type: {booking.room.type}
												</Typography>
											</Box>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													alignItems: "flex-start",
													gap: 1,
													justifyContent: "space-between",
												}}
											>
												<Typography
													fontWeight={500}
													variant="body1"
													fontStyle="italic"
												>
													Check In Date: {formatDate(booking.checkIn)}
												</Typography>
												<Typography
													fontWeight={500}
													variant="body1"
													fontStyle="italic"
												>
													Check Out Date: {formatDate(booking.checkOut)}
												</Typography>
											</Box>
											<Tooltip
												title={booking?.room?.description ?? "Room Description"}
												describeChild
												placement="bottom-end"
												slots={{
													transition: Zoom,
												}}
												slotProps={{
													tooltip: {
														sx: {
															bgcolor: (theme) => theme.palette.shades?.shade30,
															fontSize: 14,
															maxWidth: 500,
														},
													},
												}}
											>
												<CTypography
													sx={{
														fontSize: 18,
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														overflow: "hidden",
													}}
												>
													{booking?.room?.description ?? "Room Description"}
												</CTypography>
											</Tooltip>
										</Box>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px dashed gray",
												borderRadius: "12px",
												// bgcolor: "#DCE5E9",
												px: 2,
												py: 1,
												gap: 1,
												mb: 2,
											}}
										>
											<Typography
												fontWeight={300}
												variant="body1"
												color="error"
												fontStyle="italic"
											>
												{booking.room.availability
													? "Room Available for Booking"
													: "Room Booked not Available"}
											</Typography>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Typography
													fontWeight={300}
													variant="body1"
													fontStyle="italic"
												>
													Children: {booking.room.children}
												</Typography>
												<Typography
													fontWeight={300}
													variant="body1"
													fontStyle="italic"
												>
													Adults: {booking.room.adults}
												</Typography>
											</Box>
											<Box
												sx={{
													display: "flex",
													flexWrap: "wrap",
													gap: 1,
													mt: 2,
												}}
											>
												{booking?.room?.amenities?.map((amenity) => (
													<CChip key={amenity}>{amenity}</CChip>
												))}
											</Box>
										</Box>
										<Typography fontWeight={600} variant="h6">
											Pricing
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px dashed gray",
												borderRadius: "12px",
												bgcolor: "#DCE5E9",
												px: 2,
												py: 1,
												gap: 1,
												mb: 2,
											}}
										>
											<Box
												sx={{
													display: "flex",
													flexWrap: "wrap",
													rowGap: 1,
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Typography fontWeight={300} variant="body1">
													Price for Night: {booking.pricePerNight}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													Total Stay Nights: {booking.totalNights}
												</Typography>
												<Typography
													fontWeight={600}
													variant="body1"
													fontStyle="italic"
												>
													Total Price: {booking.totalPrice}
												</Typography>
											</Box>
										</Box>
										<Typography fontWeight={600} variant="h6">
											Customer Detial
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px dashed gray",
												borderRadius: "12px",
												bgcolor: "#DCE5E9",
												px: 2,
												py: 1,
												gap: 1,
											}}
										>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													rowGap: 1,
													alignItems: "flex-start",
													justifyContent: "space-between",
												}}
											>
												<Typography fontWeight={300} variant="body1">
													Customer Name: {booking.customerName}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													Customer Email: {booking.customerEmail}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													Customer Phone: {booking.customerPhone}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													Country: {booking.country}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													City : {booking.city}
												</Typography>
												<Typography fontWeight={300} variant="body1">
													Address : {booking.address}
												</Typography>
											</Box>
										</Box>
									</Box>
								</Grid>
							</>
						)}
					</Grid>
				</Box>
			</Container>
		</PageLayout>
	);
};

export default BookingsDetails;
