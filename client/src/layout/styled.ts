import { Box, styled } from "@mui/material";

export const StyledAuthLayoutContainer = styled(Box)(({ theme }) => ({
	maxWidth: "1140px",
	width: "100%",
	height: "80dvh",

	padding: "1.5rem",
	borderRadius: theme.palette.borderRadius.large,

	boxShadow: theme.palette.boxShadow?.[0],

	backdropFilter: "blur(8px)",
	border: `1px solid #424242`,
	zIndex: 2,
}));

export const StyledHeaderContainer = styled(Box)<{
	isScrolled: boolean | null;
}>(({ theme, isScrolled }) => ({
	width: "100%",
	height: "78px",
	backdropFilter: isScrolled ? "none" : "blur(10px)",
	backgroundColor: isScrolled ? "white" : "",
	position: "fixed",
	top: 0,
	left: 0,
	boxShadow: theme.palette.boxShadow?.[2],
	display: "flex",
	alignItems: "center",
	borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
	// border:'1px solid red',
	zIndex: 10,
}));

export const StyledAuthContainer = styled(Box)({
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
});
