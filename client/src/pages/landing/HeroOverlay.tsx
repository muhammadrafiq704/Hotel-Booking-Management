import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import CButton from "@/components/button/Button";
import ControlledDatePicker from "@/components/inputfield/ControlledDataPicker";
import ControlledSelectOption from "@/components/inputfield/ControlledSelectOption";
import { options } from "./config";

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
				px: 2,
				zIndex: 2,
			}}
		>
			<Box
				component="form"
				sx={{
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
					options={options}
					placeholder="Select Children"
				/>
				<ControlledSelectOption
					name="adults"
					control={control}
					label="Adults"
					options={options}
					placeholder="Select Adults"
				/>
				<Box>
					<CButton label="Search" type="submit" variant="outlined" />
				</Box>
			</Box>
		</Box>
	);
};

export default HeroOverlay;
