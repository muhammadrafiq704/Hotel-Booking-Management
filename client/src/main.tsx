import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import appRoutes from "./routes/routes";
import { appTheme } from "./theme";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found!");

const router = createBrowserRouter(createRoutesFromElements(appRoutes));

createRoot(root).render(
	<StrictMode>
		<ThemeProvider theme={appTheme}>
			<CssBaseline enableColorScheme />
			<ToastContainer />
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
);
