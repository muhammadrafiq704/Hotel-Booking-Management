import { Box, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import {
	Link,
	type SubmitOptions,
	useActionData,
	useLoaderData,
	useNavigate,
	useSearchParams,
	useSubmit,
} from "react-router-dom";
import { Container } from "@/components";
import CButton from "@/components/button/Button";
import ControlledDatePicker from "@/components/inputfield/ControlledDataPicker";
import ControlledSelectOption from "@/components/inputfield/ControlledSelectOption";
import ControlledTextField from "@/components/inputfield/ControlledTextField";
import PageLayout from "@/layout/PageLayout";
import type { Room } from "@/types/types";
import BookingConfirmationModal from "./BookingConfirmationModal";

const Booking = () => {
	const [searchParams] = useSearchParams();
	const [open, setOpen] = useState<boolean>(false);

	const { data } = useLoaderData() as {
		data: Room;
		error: boolean;
	};
	const actionData = useActionData() as {
		data: string;
		error: boolean;
		message: string;
	};

	// console.log("actionData :>> ", actionData);
	const submit = useSubmit();

	const navigate = useNavigate();

	// console.log("data :>> ", data);
	const roomId = data?._id;

	const children = searchParams.get("children") || "";
	const adults = searchParams.get("adults") || "";
	const checkInDateStr = searchParams.get("checkInDate");
	const checkOutDateStr = searchParams.get("checkOutDate");

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phone: "",
			country: "",
			address: "",
			city: "",
			notes: "",
			checkInDate: checkInDateStr ? dayjs(checkInDateStr) : null,
			checkOutDate: checkOutDateStr ? dayjs(checkOutDateStr) : null,
			adults: adults
				? Number(adults) > Number(data?.adults)
					? 1
					: adults
				: null,
			children: children
				? Number(children) > Number(data?.children)
					? 0
					: children
				: null,
		},
	});

	const childrenOptions = Array.from(
		{ length: Number(data?.children) },
		(_, index) => ({
			value: index + 1,
			label: (index + 1).toString(),
		}),
	);
	const adultOptions = Array.from(
		{ length: Number(data?.adults) },
		(_, index) => ({
			value: index + 1,
			label: (index + 1).toString(),
		}),
	);

	// useToast({
	// 	actionData,
	// 	onSuccess: () => {
	// 		navigate(`/payment/${bookingId}`);
	// 		reset();
	// 	},
	// });

	const onSubmit = (data: FieldValues) => {
		console.log("data at onSubmit :>> ", data);
		const submitOption: SubmitOptions = {
			method: "POST",
			encType: "application/json",
		};
		// const dataWithRoomId = {...data, roomId: data?._id}
		submit({ roomId: roomId, ...data }, submitOption);
	};

	useLayoutEffect(() => {
		if (actionData) {
			navigate(`/payment/${actionData.data}`);
			reset();
		}
	}, [actionData, navigate, reset]);

	return (
		<>
			<PageLayout title="Booking Confirmation">
				<Container>
					<Box py={10}>
						<Typography mb={3}>
							If You are not logged in?
							<Link to="/login">Click here to login in</Link>
						</Typography>
						<Grid container spacing={4} mb={6}>
							<Grid
								size={12}
								sx={{
									borderRadius: 4,
									bgcolor: "white",
									boxShadow: (theme) => theme.shadows[1],
									p: 4,
								}}
							>
								<Typography fontWeight={700} fontSize={24}>
									Booking Details
								</Typography>
								<Divider sx={{ mt: 2 }} />
								<Typography fontWeight={700} fontSize={16} color="gray" mt={2}>
									Check In: {dayjs(checkInDateStr).format("MMMM D, YYYY")}, from
									11:00 AM
								</Typography>
								<Typography fontWeight={700} fontSize={16} color="gray" mt={2}>
									Check In: {dayjs(checkOutDateStr).format("MMMM D, YYYY")},
									until 12:00 AM
								</Typography>
								<Typography mt={4} fontWeight={700} fontSize={24}>
									Booking Room No: {data.roomNumber}
								</Typography>
								<Divider sx={{ mt: 2 }} />
								<Typography fontWeight={700} fontSize={18} color="" mt={3}>
									Accommodation Type: {data.title}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={4} mb={6}>
							<Grid
								size={12}
								sx={{
									borderRadius: 4,
									bgcolor: "white",
									boxShadow: (theme) => theme.shadows[1],
									p: 4,
								}}
							>
								<Typography fontWeight={700} fontSize={24}>
									Price Detail
								</Typography>
								<Divider sx={{ mt: 2 }} />
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										p: 2,
									}}
								>
									<Typography fontSize={16} fontWeight={600}>
										{data.title}, {data.roomNumber}
									</Typography>
									<Typography fontSize={16} color="gray">
										PKR {data.price}/per night
									</Typography>
								</Box>
								<Divider sx={{ mt: 2 }} />
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										p: 2,
									}}
								>
									<Typography fontSize={16} fontWeight={600}>
										Total
									</Typography>
									<Typography fontSize={16} color="gray">
										PKR {data.price}/per night
									</Typography>
								</Box>
							</Grid>
						</Grid>
						<Grid
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							container
							spacing={4}
							sx={{
								borderRadius: 4,
								bgcolor: "white",
								boxShadow: (theme) => theme.shadows[1],
								p: 4,
							}}
						>
							<Grid size={12}>
								<Typography fontWeight={700} fontSize={24}>
									Your Information (fill your detail clearfully!)
								</Typography>
								<Divider sx={{ mt: 2 }} />
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="firstname"
									control={control}
									placeholder="First name"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="lastname"
									control={control}
									placeholder="Last name"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="email"
									control={control}
									placeholder="Email"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="phone"
									control={control}
									placeholder="Phone"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="country"
									control={control}
									placeholder="Country"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="address"
									control={control}
									placeholder="Address"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledTextField
									name="city"
									control={control}
									placeholder="City"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledDatePicker
									name="checkInDate"
									control={control}
									placeholder="Check in date"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledDatePicker
									name="checkOutDate"
									control={control}
									placeholder="Check out date"
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledSelectOption
									name="adults"
									control={control}
									placeholder="Adults"
									options={adultOptions}
								/>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<ControlledSelectOption
									name="children"
									control={control}
									placeholder="Children"
									options={childrenOptions}
								/>
							</Grid>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<Typography fontSize={16} fontWeight={600}>
									Total: {data?.price}/per night
								</Typography>
								<CButton label="Book Now" type="submit" />
							</Box>
						</Grid>
					</Box>
				</Container>
			</PageLayout>
			<BookingConfirmationModal open={open} onClose={() => setOpen(!open)} />
		</>
	);
};

export default Booking;
