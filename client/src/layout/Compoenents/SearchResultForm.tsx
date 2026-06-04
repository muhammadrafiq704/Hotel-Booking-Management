import { Box, Grid, Stack } from "@mui/material";
import dayjs, { type Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CButton from "@/components/button/Button";
import ControlledDatePicker from "@/components/inputfield/ControlledDataPicker";
import ControlledSelectOption from "@/components/inputfield/ControlledSelectOption";
import { options } from "@/pages/landing/config";

type SearchResultFormValues = {
	checkInDate: Dayjs | null;
	checkOutDate: Dayjs | null;
	adults: number;
	children: number;
};

type SearchResultFormProps = {
	onClose?: () => void;
	orientation?: "row" | "column";
	formData?: {
		adults: number;
		children: number;
		checkInDate: Date | null;
		checkOutDate: Date | null;
	};
};

const SearchResultForm = ({
	onClose,
	orientation = "column",
	formData,
}: SearchResultFormProps) => {
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<SearchResultFormValues>({
		// resolver: zodResolver(),
		defaultValues: {
			checkInDate: formData?.checkInDate ? dayjs(formData.checkInDate) : null,
			checkOutDate: formData?.checkOutDate
				? dayjs(formData.checkOutDate)
				: null,
			adults: formData?.adults ?? 1,
			children: formData?.children ?? 0,
		},
	});

	const onSubmit = (data: SearchResultFormValues) => {
		if (!data.checkInDate || !data.checkOutDate) {
			// Handle validation error, e.g., show a message to the user
			alert("Please select both check-in and check-out dates.");
			return;
		}
		const params = new URLSearchParams({
			checkInDate: data.checkInDate
				? dayjs(data.checkInDate).format("YYYY-MM-DD")
				: "",
			checkOutDate: data.checkOutDate
				? dayjs(data.checkOutDate).format("YYYY-MM-DD")
				: "",
			adults: data.adults.toString(),
			children: data.children.toString(),
		}).toString();
		navigate(`/search-results?${params.toString()}`);
		onClose?.();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				width: "100%",
				padding: "16px",
				backgroundColor: "#DCE5E9",
				borderRadius: "24px",
			}}
		>
			<Grid container>
				<Stack direction={orientation} width="100%" spacing={2}>
					<Grid size={12}>
						<ControlledDatePicker
							label="Check-in Date"
							name="checkInDate"
							control={control}
						/>
					</Grid>
					<Grid size={12}>
						<ControlledDatePicker
							name="checkOutDate"
							control={control}
							label="Check-out Date"
						/>
					</Grid>
					<Grid size={12}>
						<ControlledSelectOption
							name="adults"
							control={control}
							label="Adults"
							options={options}
							placeholder="Select Adults"
						/>
					</Grid>
					<Grid size={12}>
						<ControlledSelectOption
							name="children"
							control={control}
							label="Children"
							options={options}
							placeholder="Select Children"
						/>
					</Grid>
					<Box
						sx={{
							alignSelf: orientation === "row" ? "center" : "flex-end",
							gap: 1,
						}}
					>
						<CButton
							label="Search"
							type="submit"
							variant={orientation === "row" ? "outlined" : "contained"}
						/>
					</Box>
				</Stack>
			</Grid>
		</form>
	);
};

export default SearchResultForm;
