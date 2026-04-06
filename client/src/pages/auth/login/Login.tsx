import { Box, Typography } from "@mui/material";

const Login = () => {
	return (
		<Box>
			<Typography
				sx={{ color: (theme) => theme.palette.primary.main, fontSize: "2rem" }}
			>
				Login
			</Typography>
		</Box>
	);
};

export default Login;
