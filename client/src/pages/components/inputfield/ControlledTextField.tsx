import { TextField } from "@mui/material";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

type ControlledTextFieldProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	placeholder?: string;
	type?: string;
};

const ControlledTextField = <T extends FieldValues>({
	name,
	control,
	placeholder,
	type = "text",
}: ControlledTextFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					type={type}
					placeholder={placeholder}
					fullWidth
					margin="normal"
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					sx={(theme) => ({
						"& .MuiInputBase-root": {
							backgroundColor:
								theme.palette.mode === "light" ? "#f5f5f5" : "#424242",
							borderRadius: theme.palette.borderRadius?.large || "12px",
							border: `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#616161"}`,
							"&.Mui-focused": {
								borderColor: theme.palette.secondary.main,
								boxShadow: `0 0 0 2px ${theme.palette.secondary.main}33`, // 20% opacity
							},
						},
					})}
				/>
			)}
		/>
	);
};

export default ControlledTextField;
