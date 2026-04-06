import { createTheme } from "@mui/material";

export const appTheme = createTheme({
	palette: {
		primary: { main: "#1976d2" },
		secondary: { main: "#dc004e" },
		button: {
			primary: "#1976d2",
			secondary: "#dc004e",
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
			"0 4px 24px rgba(0, 0, 0, 0.1)",
			"0 6px 30px rgba(0, 0, 0, 0.1)",
		],
	},
});
