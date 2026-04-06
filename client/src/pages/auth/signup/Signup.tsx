import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CButton from "../../components/button/Button";
import ControlledTextField from "../../components/inputfield/ControlledTextField";
import CTypography from "../../components/typography/CTypography";
import { type SignupFormValues, signupSchema } from "./Schema";

const Signup = () => {
	const signupForm = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const onSubmit = (data: SignupFormValues) => {
		console.log("Form Data:", data);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			<CTypography
				sx={{
					textAlign: "center",
					fontSize: "2rem",
					textTransform: "capitalize",
				}}
				variant="h4"
			>
				booking account
			</CTypography>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Box
					component="form"
					onSubmit={signupForm.handleSubmit(onSubmit)}
					sx={{
						width: "100%",
						maxWidth: "600px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<ControlledTextField
						control={signupForm.control}
						name="username"
						type="text"
						placeholder="Enter your username"
					/>
					<ControlledTextField
						control={signupForm.control}
						name="email"
						type="email"
						placeholder="Enter your email"
					/>
					<ControlledTextField
						control={signupForm.control}
						name="password"
						type="password"
						placeholder="Enter your password"
					/>
					<ControlledTextField
						control={signupForm.control}
						name="confirmPassword"
						type="password"
						placeholder="Confirm your password"
					/>
					<Box
						sx={{
							mt: 2,
							mb: 2,
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Link
							to="/login"
							style={{
								textDecoration: "none",
								fontSize: "0.875rem",
								color: "#1976d2",
							}}
						>
							Already have an account? Log in
						</Link>
					</Box>
					<CButton variant="contained" type="submit">
						Sign Up
					</CButton>
				</Box>
			</Box>
		</Box>
	);
};

export default Signup;
