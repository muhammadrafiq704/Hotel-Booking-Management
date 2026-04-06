import { Box, styled } from "@mui/material";

export const StyledAuthLayoutContainer = styled(Box)(({ theme }) => ({
	maxWidth: "1140px",
	width: "100%",
	height: "80dvh",

	padding: "1.5rem",
	borderRadius: theme.palette.borderRadius.large,

	boxShadow: theme.palette.boxShadow?.[0],
}));
