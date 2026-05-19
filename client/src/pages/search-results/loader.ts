import type { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const params = url.search;

	try {
		const response = await HBMSApi.get(`/rooms/search-results${params}`, {
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
