import { Box, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CButton from "@/components/button/Button";
import ControlledDatePicker from "@/components/inputfield/ControlledDataPicker";
import ControlledSelectOption from "@/components/inputfield/ControlledSelectOption";
import { options } from "@/pages/landing/config";

type SearchResultFormValues = {
	"check-in-date": Date | null;
	"check-out-date": Date | null;
	adults: number;
	children: number;
};

type SearchResultFormProps = {
	onClose?: () => void;
	orientation?: "row" | "column";
};

const SearchResultForm = ({
	onClose,
	orientation = "column",
}: SearchResultFormProps) => {
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<SearchResultFormValues>({
		// resolver: zodResolver(),
		defaultValues: {
			"check-in-date": null,
			"check-out-date": null,
			adults: 1,
			children: 0,
		},
	});

	const onSubmit = (data: SearchResultFormValues) => {
		if (!data["check-in-date"] || !data["check-out-date"]) {
			// Handle validation error, e.g., show a message to the user
			alert("Please select both check-in and check-out dates.");
			return;
		}
		const params = new URLSearchParams({
			checkInDate: data["check-in-date"]
				? dayjs(data["check-in-date"]).format("YYYY-MM-DD")
				: "",
			checkOutDate: data["check-out-date"]
				? dayjs(data["check-out-date"]).format("YYYY-MM-DD")
				: "",
			adults: data.adults.toString(),
			children: data.children.toString(),
		}).toString();
		navigate(`/search-results?${params.toString()}`);
		onClose?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
			<Grid container>
				<Stack direction={orientation} width="100%" spacing={2}>
					<Grid size={12}>
						<ControlledDatePicker
							label="Check-in Date"
							name="check-in-date"
							control={control}
						/>
					</Grid>
					<Grid size={12}>
						<ControlledDatePicker
							name="check-out-date"
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
