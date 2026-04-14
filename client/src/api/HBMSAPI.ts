import axios from "axios";

// Create an AXIOS instance
const HBMSApi = axios.create({
	baseURL: import.meta.env.HBMS_BASE_URL || "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

//Add Request Interceptor (e.g., for Authorization)
HBMSApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Optional Add Response Interceptor (e.g., for error handling)
HBMSApi.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle errors globally
		if (error.response && error.response.status === 401) {
			// Redirect to login or refresh token
		}
		return Promise.reject(error);
	},
);

export default HBMSApi;

//api error message extractor
export const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message || "An error occurred";
	}
	return "An unexpected error occurred";
};
