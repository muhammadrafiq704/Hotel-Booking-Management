import type { LoaderFunction } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

const loader: LoaderFunction = async ({ params }) => {
	const { id } = params;
	console.log("booking id :>> ", id);
	try {
		const response = await HBMSApi.post(`/payments/create-intent/${id}`, {
			withCredentials: true,
		});
		console.log("response :>> ", response);
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

export default loader;
