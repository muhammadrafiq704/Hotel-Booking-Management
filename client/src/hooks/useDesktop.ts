import { useMediaQuery } from "@mui/material";

export const useDesktop = () => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	return isDesktop;
};
