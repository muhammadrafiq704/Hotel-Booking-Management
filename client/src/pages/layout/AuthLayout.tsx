import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { StyledAuthLayoutContainer } from "./styled";

const AuthLayout = () => {
	return (
		<Box
			px={1.5}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100dvh",
			}}
		>
			<StyledAuthLayoutContainer>
				<Outlet />
			</StyledAuthLayoutContainer>
		</Box>
	);
};

export default AuthLayout;
