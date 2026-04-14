import { Button, CircularProgress } from "@mui/material";

interface CButtonProps {
	variant?: "text" | "outlined" | "contained";
	color?: "primary" | "secondary";
	onClick?: () => void;
	label: string;
	type?: "button" | "submit" | "reset";
	isLoading?: boolean;
}

const CButton = ({
	variant = "contained",
	color = "primary",
	onClick,
	label,
	type = "button",
	isLoading = false,
}: CButtonProps) => {
	// console.log('isLoading :>> ', isLoading);
	return variant === "contained" ? (
		<Button
			variant={variant}
			color={color}
			onClick={onClick}
			type={type}
			disabled={isLoading}
			sx={{
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				// maxWidth: "200px",
				// width: "100%",
				boxShadow: (theme) => theme.palette.boxShadow?.[1],
				px: 2.75,
				py: 1,
				fontWeight: "bold",
				fontSize: "1rem",
				// alignSelf: "center",
				textTransform: "capitalize",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
			{isLoading ? "Submitting..." : label}
		</Button>
	) : (
		<Button
			variant={variant}
			color={color}
			onClick={onClick}
			type={type}
			disabled={isLoading}
			sx={{
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				// maxWidth: "200px",
				// width: "100%",
				boxShadow: (theme) => theme.palette.boxShadow?.[1],
				px: 2.75,
				py: 1,
				fontWeight: "bold",
				fontSize: "1rem",
				alignSelf: "center",
				textTransform: "capitalize",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
			{isLoading ? "Submitting..." : label}
		</Button>
	);
};

export default CButton;
