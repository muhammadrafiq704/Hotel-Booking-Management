import type { ActionFunction } from "react-router-dom";
import HBMSApi, { getErrorMessage } from "../../../api/HBMSAPI";
import type { SignUpResponseDTO } from "./types";

const action: ActionFunction<SignUpResponseDTO> = async ({ request }) => {
	try {
		const requestedData = await request.json();
		console.log("Requested Data:", requestedData);

		const response = await HBMSApi.post("/auth/register", requestedData);
		console.log("API Response:", response.data);

		if (response.status !== 201) {
			return {
				error: true,
				message: response.data.message,
			};
		}
		return {
			error: false,
			message: response.data.message,
		};
	} catch (error) {
		console.log("error :>> ", error);
		return {
			error: true,
			message: getErrorMessage(error),
		};
	}
};

export default action;
