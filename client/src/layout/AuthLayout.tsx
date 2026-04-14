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
				backgroundImage: "url('/src/assets/bg/background-image-1.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				overflow: "hidden",
				position: "relative",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the opacity as needed
					zIndex: 1,
				},
			}}
		>
			<StyledAuthLayoutContainer>
				<Outlet />
			</StyledAuthLayoutContainer>
		</Box>
	);
};

export default AuthLayout;
