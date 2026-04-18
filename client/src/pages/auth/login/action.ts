import type { ActionFunction } from "react-router-dom";
import HBMSApi from "../../../api/HBMSAPI";

const action: ActionFunction = async ({ request }) => {
	try {
		const loginData = await request.json();
		const response = await HBMSApi.post("/auth/login", loginData, {
			withCredentials: true,
		});

		if (response.status !== 200) {
			return {
				error: true,
				message: response.data.message,
				data: response.data.data,
			};
		}
		return {
			error: false,
			message: response.data.message,
			data: response.data.data,
		};
	} catch (error) {
		return {
			error: true,
			message:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

export default action;
