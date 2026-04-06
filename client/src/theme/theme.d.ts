import type { PaletteOptions as PaletteOptionsMUI } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
	interface PaletteOptions extends PaletteOptionsMUI {
		button: {
			primary: string;
			secondary: string;
		};
		borderRadius: {
			medium: string;
			large: string;
			extraLarge: string;
		};
		custom?: {
			mainBg?: string;
		};
		boxShadow?: string[];
	}

	interface Palette extends PaletteOptions {}
}
