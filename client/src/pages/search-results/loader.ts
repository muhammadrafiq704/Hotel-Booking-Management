import { AxiosError } from "axios";
import type { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const params = url.search;

	try {
		const response = await HBMSApi.get(`/rooms/search-results${params}`, {
			withCredentials: true,
		});

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
