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
import { type LoginFormValues, loginSchema } from "./Schema";

const Login = () => {
	const submit = useSubmit();
	const actionData = useActionData() as ActionProps;
	const navigate = useNavigate();

	const loginForm = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = (data: LoginFormValues) => {
		const submitOptions: SubmitOptions = {
			method: "POST",
			encType: "application/json",
		};
		submit(data, submitOptions);
	};

	useToast({
		actionData,
		onSuccess: () => {
			navigate("/");
			loginForm.reset();
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
				Login
			</CTypography>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Box
					component="form"
					onSubmit={loginForm.handleSubmit(onSubmit)}
					sx={{
						width: "100%",
						maxWidth: "600px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<ControlledTextField
						control={loginForm.control}
						name="email"
						type="email"
						placeholder="Enter your email"
					/>
					<ControlledTextField
						control={loginForm.control}
						name="password"
						type="password"
						placeholder="Enter your password"
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
							to="/signup"
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
							Don't have an account? Sign up
						</Link>
					</Box>
					<CButton
						variant="contained"
						type="submit"
						isLoading={loginForm.formState.isSubmitting}
						label="Log In"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
