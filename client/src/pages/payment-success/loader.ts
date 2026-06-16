import { AxiosError } from "axios";
import { defer, type LoaderFunctionArgs } from "react-router-dom";
import HBMSApi from "@/api/HBMSAPI";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const sessionId = url.searchParams.get("session_id");

	if (!sessionId) {
		return {
			paid: false,
			booking: null,
			error: "Invalid session",
		};
	}

	try {
		const res = HBMSApi.get(`/payments/verify-session/${sessionId}`);

		return defer({
			result: res.then((r) => r.data),
		});
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
