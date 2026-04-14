import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import ControlledDatePicker from "@/components/inputfield/ControlledDataPicker";
import ControlledSelectOption from "@/components/inputfield/ControlledSelectOption";

const HeroOverlay = () => {
	const { control } = useForm({
		defaultValues: {
			"check-in-date": null,
			"check-out-date": null,
			children: undefined,
			adults: undefined,
		},
	});
	return (
		<Box
			sx={{
				position: "absolute",
				bottom: 0,
				left: "50%",
				width: "100%",
				maxWidth: "1200px",
				transform: "translate(-50%, 50%)",
				border: "1px solid red",
				px: 4,
				py: 2,
				bgcolor: "white",
				boxShadow: (theme) => theme.palette.boxShadow?.[0],
				borderRadius: (theme) => theme.shape.borderRadius,

				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				gap: 2,
				alignItems: "center",
			}}
		>
			<ControlledDatePicker
				name="check-in-date"
				control={control}
				label="Check-in Date"
			/>
			<ControlledDatePicker
				name="check-out-date"
				control={control}
				label="Check-out Date"
			/>
			<ControlledSelectOption
				name="children"
				control={control}
				label="Children"
				options={[
					{ label: "0", value: 0 },
					{ label: "1", value: 1 },
					{ label: "2", value: 2 },
					{ label: "3", value: 3 },
				]}
				placeholder="Select Children"
			/>
			<ControlledSelectOption
				name="adults"
				control={control}
				label="Adults"
				options={[
					{ label: "0", value: 0 },
					{ label: "1", value: 1 },
					{ label: "2", value: 2 },
					{ label: "3", value: 3 },
				]}
				placeholder="Select Adults"
			/>
		</Box>
	);
};

export default HeroOverlay;
