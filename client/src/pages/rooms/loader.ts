import type { LoaderFunction } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const type = url.searchParams.get("type") || "all rooms";
	try {
		const response = await HBMSApi.get("/rooms", {
			params: { type },
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

export default loader;
