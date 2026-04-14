import { useEffect } from "react";
import { toast } from "react-toastify";
import type { ActionProps } from "../types/types";

type UseToastProps = {
	actionData: ActionProps | null;
	onSuccess: () => void;
};

const useToast = ({ actionData, onSuccess }: UseToastProps) => {
	return useEffect(() => {
		if (!actionData) return;
		// debug tip
		console.log("Toast effect triggered");
		if (actionData?.error) {
			toast.error(actionData?.message, { toastId: "error-toast" });
		} else {
			toast.success(actionData?.message || "Success", {
				toastId: "success-toast",
			});
			onSuccess?.();
		}
	}, [actionData, onSuccess]);
};

export default useToast;
