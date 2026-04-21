import { Box } from "@mui/material";
import SimpleBar from "simplebar-react";
import RoomIcon from "@/assets/icons/room.svg?react";
import CTypography from "@/components/typography/CTypography";
import { useMobile } from "@/hooks/useMobile";
import { dummyBookings } from "./config";

const RecentBooking = () => {
	const isMobile = useMobile();
	return (
		<Box
			sx={{
				p: 2.5,
				backdropFilter: "blur(16px)",
				borderRadius: 4,
				maxWidth: "400px",
				width: "100%",
				height: isMobile ? "350px" : "400px",
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
	);
};

export default RecentBooking;
