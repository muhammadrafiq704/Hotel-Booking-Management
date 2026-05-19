import { createTheme } from "@mui/material";

export const appTheme = createTheme({
	typography: {
		fontFamily: "Poppins, Arial, sans-serif",
	},
	palette: {
		primary: { main: "#1C274C", light: "#6d718d" },
		secondary: { main: "#FFFFFF", light: "#F8F8FF" },
		button: {
			primary: "#1C274C",
			secondary: "#F8F8FF",
		},
		borderRadius: {
			medium: "8px",
			large: "12px",
			extraLarge: "32px",
		},
		custom: {
			mainBg: "#f5f5f5",
		},
		boxShadow: [
			"0 4px 24px rgba(28, 39, 76, 0.1)",
			"0 4px 10px rgba(28, 39, 76, 0.1)",
			"0 2px 10px rgba(28, 39, 76, 0.1)",
		],
		shades: {
			shade30: "#B1BBC6",
			shade20: "#C7D0D8",
			shade10: "#DCE5E9",
		},
	},
});
