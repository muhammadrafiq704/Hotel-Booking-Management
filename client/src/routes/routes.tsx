import { Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login/Login";
import AuthLayout from "../pages/layout/AuthLayout";
import { appPaths } from "./appPaths";

const appRoutes = (
	<Route
		path="/"
		element={<App />}
		errorElement={<div>Something went wrong!</div>}
	>
		<Route element={<AuthLayout />}>
			<Route path={appPaths.LOGIN} element={<Login />} />
			<Route
				path={appPaths.SIGN_UP}
				lazy={() => import("../pages/auth/signup")}
			/>
		</Route>
	</Route>
);

export default appRoutes;
