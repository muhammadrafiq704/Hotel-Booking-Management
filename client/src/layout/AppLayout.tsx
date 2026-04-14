import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = () => {
	return (
		<Box>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
};

export default AppLayout;
