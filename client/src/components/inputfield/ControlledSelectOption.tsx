import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import CTypography from "../typography/CTypography";

type ControlledSelectOptionProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	options: {
		label: string;
		value: string | number;
	}[];
};

const ControlledSelectOption = <T extends FieldValues>({
	name,
	control,
	options,
	label,
	placeholder = "Select an option",
}: ControlledSelectOptionProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl
					fullWidth
					error={!!fieldState.error}
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

					<Select
						{...field}
						value={field.value ?? ""}
						onChange={(event) => field.onChange(event.target.value)}
						displayEmpty
						renderValue={(selected) => {
							if (!selected) {
								return <span style={{ color: "#9e9e9e" }}>{placeholder}</span>;
							}
							const selectedOption = options.find(
								(opt) => opt.value === selected,
							);

							return selectedOption?.label ?? selected;
						}}
						MenuProps={{
							PaperProps: {
								sx: {
									maxHeight: 250,
								},
							},
						}}
					>
						{options.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
								sx={{ maxHeight: 48 }}
							>
								{option.label}
							</MenuItem>
						))}
					</Select>

					<FormHelperText>{fieldState.error?.message}</FormHelperText>
				</FormControl>
			)}
		/>
	);
};

export default ControlledSelectOption;
