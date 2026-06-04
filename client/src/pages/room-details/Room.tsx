import { Box, Grid } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Container } from "@/components";
import SwiperComponent from "@/components/slider/Swiper";
import CTypography from "@/components/typography/CTypography";
import SearchResultForm from "@/layout/Compoenents/SearchResultForm";
import PageLayout from "@/layout/PageLayout";
import type { Room } from "@/types/types";
import { importantInfo } from "./config";

const Rooms = () => {
	const { data, message } = useLoaderData() as {
		data: Room;
		message: string;
		error: boolean;
	};
	// console.log("data :>> ", data);

	const amenitiesIconsMap: Record<string, string> = {
		"24 hours": "/src/assets/icons/24-hour.svg",
		wifi: "/src/assets/icons/wifi.svg",
		"free guiding": "/src/assets/icons/guide.svg",
		"attach bath": "/src/assets/icons/bath.svg",
	};

	return (
		<PageLayout title={data.title} image={data.images[0]} actionBtn>
			<Container>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						gap: 4,
						py: 10,
					}}
				>
					<Grid container spacing={6} mt={4} sx={{ width: "100%" }}>
						{!data ? (
							<Grid size={12}>
								<RoomsNotFound message={message} />
							</Grid>
						) : (
							<Box
								sx={{
									display: "flex",
									flexDirection: {
										xs: "column",
										md: "row",
									},
									gap: 6,
									width: "100%",
									alignItems: "flex-start",
								}}
							>
								{/*  room detail */}
								<Box
									sx={{
										width: {
											xs: "100%",
											md: "70%",
										},
										// border: '1px solid red',
									}}
								>
									<Box
										mb={4}
										sx={{ display: "flex", alignItems: "center", gap: "10px" }}
									>
										<CTypography variant="body1" sx={{ fontWeight: 700 }}>
											Pricing starts from:
										</CTypography>
										<span
											style={{
												fontWeight: 300,
												fontSize: "16px",
												fontStyle: "italic",
											}}
										>
											PKR {data.price} / per night
										</span>
									</Box>
									<Box
										sx={{
											overflow: "hidden",
										}}
									>
										<SwiperComponent images={data.images} />
									</Box>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: 2,
											mt: 8,
										}}
									>
										<CTypography sx={{ fontSize: "18px" }}>
											{data.description}
										</CTypography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												gap: 4,
											}}
										>
											<CTypography variant="h5" sx={{ fontWeight: 600 }}>
												Amenities
											</CTypography>
											<Grid container spacing={2}>
												{data.amenities.map((amenity) => (
													<Grid key={amenity} size={{ xs: 2, md: 4 }}>
														<Box
															sx={{
																display: "flex",
																flexDirection: "column",
																alignItems: "center",
																justifyContent: "center",
																gap: 2,
																border: (theme) =>
																	`1px solid ${theme.palette.divider}`,
																borderRadius: 4,
																p: 4,
															}}
														>
															<img
																src={amenitiesIconsMap[amenity]}
																alt={amenity}
																width={50}
																height={50}
															/>
															<CTypography
																variant="h6"
																sx={{ textTransform: "capitalize" }}
															>
																{amenity}
															</CTypography>
														</Box>
													</Grid>
												))}
											</Grid>
										</Box>
									</Box>
									{/* important information  */}
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: 2,
											mt: 8,
										}}
									>
										{importantInfo.map((info) => (
											<Box
												key={info.id}
												sx={{
													display: "flex",
													flexDirection: "column",
													gap: 1,
													border: (theme) =>
														`1px solid ${theme.palette.divider}`,
													borderRadius: 4,
													p: 2,
												}}
											>
												<CTypography variant="h6" sx={{ fontWeight: 600 }}>
													{" "}
													{info.title}
												</CTypography>
												<CTypography
													variant="body1"
													sx={{ fontSize: 16, fontWeight: 300 }}
												>
													{info.description}
												</CTypography>
											</Box>
										))}
									</Box>
								</Box>
								<Box
									sx={{
										width: {
											xs: "100%",
											md: "30%",
										},
										position: "sticky",
										top: 120,
										alignSelf: "flex-start",
									}}
								>
									<SearchResultForm />
								</Box>
							</Box>
						)}
					</Grid>
				</Box>
			</Container>
		</PageLayout>
	);
};

export default Rooms;

function RoomsNotFound({ message }: { message: string }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				alignItems: "center",
				justifyContent: "center",
				height: "30vh",
			}}
		>
			<svg
				width="64px"
				height="64px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>No rooms found</title>
				<path
					d="M19.3517 7.61665L15.3929 4.05375C14.2651 3.03868 13.7012 2.53114 13.0092 2.26562L13 5.00011C13 7.35713 13 8.53564 13.7322 9.26787C14.4645 10.0001 15.643 10.0001 18 10.0001H21.5801C21.2175 9.29588 20.5684 8.71164 19.3517 7.61665Z"
					fill="#1C274C"
				></path>{" "}
				<path
					d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2.72548 20.3823 2.44924 19.8327 2.27818 19.1149C2.15904 18.6149 2.09948 18.3649 2.21429 18.0728C2.32911 17.7806 2.58217 17.6119 3.08829 17.2745L3.71429 16.8571C4.49285 16.3381 5.50715 16.3381 6.28571 16.8571C7.3238 17.5492 8.6762 17.5492 9.71429 16.8571C10.4929 16.3381 11.5071 16.3381 12.2857 16.8571C13.3238 17.5492 14.6762 17.5492 15.7143 16.8571C16.4929 16.3381 17.5071 16.3381 18.2857 16.8571C19.3238 17.5492 20.6762 17.5492 21.7143 16.8571C21.8241 16.7839 21.9705 16.8681 21.965 17C21.8873 18.8723 21.6366 20.0203 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
					fill="#1C274C"
				></path>{" "}
				<path
					d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.23869 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9934V12.3273C21.9973 12.5399 21.8912 12.7392 21.7143 12.8571C20.6762 13.5492 19.3238 13.5492 18.2857 12.8571C17.5071 12.3381 16.4929 12.3381 15.7143 12.8571C14.6762 13.5492 13.3238 13.5492 12.2857 12.8571C11.5071 12.3381 10.4929 12.3381 9.71429 12.8571C8.6762 13.5492 7.3238 13.5492 6.28571 12.8571C5.50715 12.3381 4.49285 12.3381 3.71429 12.8571L3.5547 12.9635C2.87033 13.4198 2.52814 13.6479 2.26407 13.5066C2 13.3653 2 12.954 2 12.1315V10Z"
					fill="#1C274C"
				></path>
			</svg>
			<CTypography
				sx={{ fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}
			>
				{message}
			</CTypography>
		</Box>
	);
}
