import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
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
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const isPassword = type === "password";

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					type={isPassword && !showPassword ? "password" : "text"}
					placeholder={placeholder}
					fullWidth
					margin="normal"
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					sx={(theme) => ({
						"& .MuiOutlinedInput-root": {
							backgroundColor:
								theme.palette.mode === "light" ? "#f5f5f5" : "#424242",
							borderRadius: theme.shape.borderRadius,
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: null,
								borderWidth: "0px",
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.primary.main,
								borderWidth: "1px",
							},
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								borderColor: theme.palette.primary.main,
								borderWidth: "2px",
							},
							"&.Mui-focused": {
								boxShadow: `0 0 0 4px ${theme.palette.primary.main}33`,
							},
						},
					})}
					slotProps={{
						input: {
							endAdornment: isPassword ? (
								<InputAdornment position="end">
									<IconButton edge="end" onClick={togglePasswordVisibility}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							) : null,
						},
					}}
				/>
			)}
		/>
	);
};

export default ControlledTextField;
