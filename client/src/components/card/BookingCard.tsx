import {
	Box,
	Card,
	CardContent,
	type CardOwnProps,
	Chip,
	Stack,
	Tooltip,
	Zoom,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Booking } from "@/types/types";
import CButton from "../button/Button";
import { CChip } from "../index";
import SwiperComponent from "../slider/Swiper";
import CTypography from "../typography/CTypography";

interface BookingCardProps {
	orientation?: "horizontal" | "vertical";
	variant?: CardOwnProps["variant"];
	index?: number;
	booking?: Omit<Booking, "user">;
	// booking?: Booking;
	actionType?: string;
}

function BookingCard({
	orientation,
	variant = "elevation",
	booking,
	index,
	actionType,
	...props
}: BookingCardProps) {
	const navigate = useNavigate();
	const isEven = index !== undefined ? index % 2 === 0 : false;

	return (
		<Card
			variant={variant}
			{...props}
			sx={{
				minHeight: {
					xs: "auto",
					md: 400,
				},
				height: "100%",
				display: "flex",
				flexDirection: {
					xs: "column",
					md: isEven ? "row" : "row-reverse",
				},
				borderRadius: 4,
				position: "relative",
				"&.MuiCard-root": {
					boxShadow: (theme) =>
						theme.palette.boxShadow?.[0] || "0 4px 24px rgba(28, 39, 76, 0.1)",
					transition: "0.3s",
					cursor: "pointer",
					":hover": {
						transform: "translateY(-4px)",
						boxShadow: (theme) =>
							theme.palette.boxShadow?.[1] ||
							"0 8px 32px rgba(28, 39, 76, 0.15)",
					},
				},
			}}
		>
			{booking?.status !== "confirmed" ? (
				<Chip
					label="Available"
					sx={{
						backdropFilter: "blur(8px)",
						backgroundColor: "rgba(255, 255, 255, 0.3)",
						WebkitBackdropFilter: "blur(12px)",
						position: "absolute",
						color: "#fff",
						fontWeight: 500,
						top: 16,
						zIndex: 1,
						...(isEven ? { left: 16 } : { right: 16 }),
						ml: 2,
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
						...(isEven ? { left: 16 } : { right: 16 }),
						ml: 2,
					}}
				/>
			)}
			{booking?.room?.images && (
				<Box
					sx={{
						flex: 1,
						borderRadius: "16px",
						overflow: "hidden",
					}}
				>
					<SwiperComponent images={booking.room.images} />
				</Box>
			)}
			<CardContent
				sx={{
					height: "100%",
					flex: 1,
					"& .MuiCardActionArea-focusHighlight": {
						bgcolor: (theme) => theme.palette.primary.light,
					},
				}}
			>
				<Stack
					direction={orientation === "horizontal" ? "row" : "column"}
					spacing={2}
					sx={{ height: "100%" }}
				>
					<Box p={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<CTypography
							sx={{
								fontWeight: "bold",
								fontSize: {
									xs: 24,
									md: 42,
								},
								letterSpacing: -0.5,
								lineHeight: 1.2,
							}}
						>
							{booking?.room?.title ?? "Room Title"}
						</CTypography>
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
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
							{booking?.room?.amenities?.map((amenity) => (
								<CChip key={amenity}>{amenity}</CChip>
							))}
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: isEven ? "flex-end" : "flex-start",
							}}
						>
							<Box
								sx={{
									width: "fit-content",
									fontSize: 14,
									mt: 2,
									borderRadius: 4,
									border: (theme) => `1px solid ${theme.palette.divider}`,
									fontWeight: 700,
									letterSpacing: -0.25,
									wordSpacing: 0.5,
									lineHeight: 1.5,
									px: 2,
									py: 1,
								}}
							>
								{`PKR ${booking?.room?.price} / per night`}
							</Box>
						</Box>
						<CButton
							label="View Details"
							sx={{ mt: 2 }}
							onClick={() => navigate(`/bookings/${booking?._id}`)}
						/>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}
export default React.memo(BookingCard);
