import { Button, CircularProgress } from "@mui/material";

interface CButtonProps {
	variant?: "text" | "outlined" | "contained";
	onClick?: () => void;
	label: string;
	type?: "button" | "submit" | "reset";
	isLoading?: boolean;
}

const CButton = ({
	variant = "contained",
	onClick,
	label,
	type = "button",
	isLoading = false,
}: CButtonProps) => {
	// console.log('isLoading :>> ', isLoading);
	return variant === "contained" ? (
		<Button
			variant={variant}
			onClick={onClick}
			type={type}
			disabled={isLoading}
			sx={{
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				boxShadow: (theme) => theme.palette.boxShadow?.[1],
				px: 2.75,
				py: 1,
				fontWeight: "bold",
				fontSize: "1rem",
				textTransform: "capitalize",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				letterSpacing: -0.25,
				wordSpacing: 0.5,
				lineHeight: 1.8,
			}}
		>
			{isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
			{isLoading ? "Submitting..." : label}
		</Button>
	) : (
		<Button
			variant={variant}
			onClick={onClick}
			type={type}
			disabled={isLoading}
			sx={{
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				// boxShadow: (theme) => theme.palette.boxShadow?.[1],
				bgcolor: "transparent",
				border: (theme) => `1.8px solid ${theme.palette.primary.main}`,
				color: (theme) => theme.palette.primary.main,
				"&:hover": {
					bgcolor: (theme) => theme.palette.primary.main,
					color: "white",
				},
				transition: "all 0.2s ease",
				px: 2.75,
				py: 1,
				letterSpacing: -0.25,
				wordSpacing: 0.5,
				lineHeight: 1.8,
				fontWeight: "bold",
				fontSize: "1rem",
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
