import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import {
	Link as RouterLink,
	type SubmitOptions,
	useActionData,
	useNavigate,
	useSubmit,
} from "react-router-dom";
import CButton from "@/components/button/Button";
import ControlledTextField from "@/components/inputfield/ControlledTextField";
import CTypography from "@/components/typography/CTypography";
import useToast from "@/hooks/useToast";
import type { ActionProps } from "@/types/types";
import { type SignupFormValues, signupSchema } from "./Schema";

const Signup = () => {
	const submit = useSubmit();
	const actionData = useActionData() as ActionProps;
	const navigate = useNavigate();

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
		const submitOptions: SubmitOptions = {
			method: "POST",
			encType: "application/json",
		};
		submit(data, submitOptions);
	};
	useToast({
		actionData,
		onSuccess: () => {
			navigate("/login");
			signupForm.reset();
		},
	});
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			<CTypography
				sx={{
					textAlign: "center",
					fontSize: "2rem",
					textTransform: "capitalize",
					color: "white",
					fontWeight: 700,
				}}
				variant="h4"
			>
				Register
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
							component={RouterLink}
							to="/login"
							sx={{
								textDecoration: "none",
								fontSize: "0.875rem",
								color: "white",
								transition: "all 0.3s ease",
								fontWeight: 500,
								"&:hover": {
									textDecoration: "underline",
									color: (theme) => theme.palette.primary.main,
								},
							}}
						>
							Already have an account? Log in
						</Link>
					</Box>
					<CButton
						variant="contained"
						type="submit"
						isLoading={signupForm.formState.isSubmitting}
						label="Sign Up"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Signup;
