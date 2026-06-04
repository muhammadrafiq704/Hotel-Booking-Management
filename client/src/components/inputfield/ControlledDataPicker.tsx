import { FormControl, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import CTypography from "../typography/CTypography";

type ControlledDatePickerProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
};

const ControlledDatePicker = <T extends FieldValues>({
	name,
	control,
	label,
}: ControlledDatePickerProps<T>) => {
	const isCheckOut = name === "check-out-date";
	const minDate = isCheckOut ? dayjs().add(1, "day") : dayjs();

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => (
					<FormControl
						fullWidth
						sx={{ display: "flex", flexDirection: "column", gap: 1 }}
					>
						{label && (
							<CTypography
								sx={{
									fontWeight: "bold",
									color: (theme) => theme.palette.primary.main,
									wordSpacing: 0.1,
									letterSpacing: 0.1,
									fontSize: "0.95rem",
									lineHeight: 1.2,
								}}
							>
								{label}
							</CTypography>
						)}
						<DatePicker
							minDate={minDate}
							value={field.value || null}
							onChange={(newValue: Dayjs | null) => {
								field.onChange(newValue);
							}}
							slotProps={{
								actionBar: {
									actions: ["clear", "accept"],
								},
								textField: {
									sx: (theme) => ({
										"& .MuiPickersInputBase-root": {
											borderRadius: 4,
											backgroundColor:
												theme.palette.mode === "light" ? "#f5f5f5" : "#424242",
										},

										"& .MuiPickersOutlinedInput-notchedOutline": {
											border: "none",
										},

										"& .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline":
											{
												border: `1px solid ${theme.palette.primary.main}`,
											},

										"& .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline":
											{
												border: `2px solid ${theme.palette.primary.main}`,
											},

										"& .MuiPickersOutlinedInput-root.Mui-focused": {
											boxShadow: `0 0 0 4px ${theme.palette.primary.main}33`,
											borderRadius: 4,
										},
									}),
								},
							}}
						/>
						<FormHelperText>{fieldState.error?.message}</FormHelperText>
					</FormControl>
				)}
			/>
		</LocalizationProvider>
	);
};

export default ControlledDatePicker;
