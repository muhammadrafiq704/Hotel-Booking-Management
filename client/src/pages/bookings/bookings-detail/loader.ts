import { AxiosError } from "axios";
import type { LoaderFunction } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

const loader: LoaderFunction = async ({ params }) => {
	const { id } = params;
	try {
		const response = await HBMSApi.get(`/rooms/${id}`, {
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
		if (error instanceof AxiosError) {
			return {
				error: true,
				message:
					error.response?.data?.message || error.message || "Request failed",
			};
		}

		return {
			error: true,
			message: "An unknown error occurred at search result loader",
		};
	}
};

export default loader;
