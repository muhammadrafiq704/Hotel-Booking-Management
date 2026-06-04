import { Route } from "react-router-dom";
import App from "@/App";
import AppLayout from "@/layout/AppLayout";
// import AuthLayout from "../pages/layout/AuthLayout";
import AuthLayout from "@/layout/AuthLayout";
import Landing from "@/pages/landing/Landing";
import { appPaths } from "./appPaths";

const appRoutes = (
	<Route
		path="/"
		element={<App />}
		errorElement={<div>Something went wrong!</div>}
	>
		<Route element={<AuthLayout />}>
			<Route path={appPaths.LOGIN} lazy={() => import("@/pages/auth/login")} />
			<Route
				path={appPaths.SIGN_UP}
				lazy={() => import("@/pages/auth/signup")}
			/>
		</Route>
		<Route element={<AppLayout />}>
			<Route path={appPaths.ROOT} element={<Landing />} />
			<Route path={appPaths.ROOMS} lazy={() => import("@/pages/rooms")} />
			<Route
				path={appPaths.ROOM_DETAILS}
				lazy={() => import("@/pages/room-details")}
			/>
			<Route
				path={appPaths.SEARCH_RESULTS}
				lazy={() => import("@/pages/search-results")}
				// element={<SearchResults />}
			/>
			<Route
				path={appPaths.CONFIRM_BOOKING}
				lazy={() => import("@/pages/booking")}
				// element={<SearchResults />}
			/>
		</Route>
	</Route>
);

export default appRoutes;
