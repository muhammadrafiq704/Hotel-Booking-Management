import { Box } from "@mui/material";
import SimpleBar from "simplebar-react";
import RoomIcon from "@/assets/icons/room.svg?react";
import { Container } from "@/components";
import CButton from "@/components/button/Button";
import CTypography from "@/components/typography/CTypography";
import { dummyBookings } from "./config";
import "simplebar-react/dist/simplebar.min.css";
import HeroOverlay from "./HeroOverlay";

const Hero = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				position: "relative",
			}}
		>
			<Box
				sx={{
					width: "100%",
					minHeight: "100dvh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					backgroundImage: "url('/src/assets/bg/background-image-1.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* <Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						overflow: "hidden",
						zIndex: 0,
					}}
				> */}
				{/* <VideoSlider /> */}
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						backgroundColor: "rgba(0,0,0,0.2)",
						zIndex: 1,
					}}
				/>
				{/* </Box> */}
				<Container
					sx={{
						zIndex: 2,
						display: "flex",
						gap: 4,
						flexDirection: { xs: "column", md: "row" },
						alignItems: "center",
						justifyContent: "space-between",
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							gap: 4,
							// border: '1px solid blue',
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								alignItems: "flex-start",
								maxWidth: "550px",
							}}
						>
							<CTypography
								sx={(theme) => ({
									fontSize: "5.5rem",
									fontWeight: 700,
									color: theme.palette.secondary.main,
									letterSpacing: 0.5,
									lineHeight: 1.2,
								})}
							>
								Find Your{" "}
								<span style={{ color: "#FFD700", fontStyle: "italic" }}>
									Perfect Stay
								</span>
							</CTypography>
							<CTypography
								sx={(theme) => ({
									fontSize: "1.25rem",
									color: theme.palette.secondary.main,
									opacity: 0.6,
								})}
							>
								Discover and book hotels with ease, ensuring a seamless travel
								experience.
							</CTypography>
						</Box>
						<CButton label="Explore Rooms" variant="contained" />
					</Box>
					<Box
						sx={{
							p: 2.5,
							backdropFilter: "blur(16px)",
							borderRadius: 4,
							maxWidth: "400px",
							width: "100%",
							height: "400px",
							display: "flex",
							flexDirection: "column",
							gap: 3,
							overflow: "hidden",
							boxShadow: (theme) => theme.palette.boxShadow?.[1],
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-start",
								width: "100%",
								gap: 1,
								borderBottom: "1px solid rgba(255,255,255,0.2)",
								pb: 1.5,
							}}
						>
							<RoomIcon width={18} height={18} />
							<CTypography
								sx={(theme) => ({
									fontSize: "1rem",
									fontWeight: 700,
									color: theme.palette.secondary.main,
									letterSpacing: 0.1,
									lineHeight: 1,
								})}
							>
								Recent Bookings
							</CTypography>
						</Box>
						<Box sx={{ width: "100%", overflow: "hidden" }}>
							<SimpleBar autoHide={true} style={{ maxHeight: 300 }}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: 1,
										px: 1.5,
									}}
								>
									{dummyBookings.map((booking) => (
										<Box
											key={booking.id}
											sx={{
												display: "flex",
												flexDirection: "column",
												gap: 1,
												backgroundColor: (theme) => theme.palette.primary.main,
												px: 2,
												py: 1,
												borderRadius: (theme) => theme.shape.borderRadius,
											}}
										>
											<CTypography
												sx={(theme) => ({
													fontSize: "0.95rem",
													fontWeight: 600,
													color: theme.palette.secondary.main,
													letterSpacing: 0.1,
													lineHeight: 1.2,
												})}
											>
												{booking.roomType} -{" "}
												<span
													style={{
														fontStyle: "italic",
														fontWeight: 400,
														opacity: 0.6,
													}}
												>
													{booking.roomNumber}{" "}
												</span>
											</CTypography>
											<CTypography
												sx={(theme) => ({
													fontSize: "0.85rem",
													color: theme.palette.secondary.main,
													opacity: 0.6,
												})}
											>
												{new Date(booking.bookingDate).toLocaleDateString()} -{" "}
												{booking.totalPrice} PKR
											</CTypography>
										</Box>
									))}
								</Box>
							</SimpleBar>
						</Box>
					</Box>
				</Container>
			</Box>
			<HeroOverlay />
		</Box>
	);
};

export default Hero;
