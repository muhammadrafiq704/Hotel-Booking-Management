import {
	Button,
	CircularProgress,
	type SxProps,
	type Theme,
} from "@mui/material";
import { useMobile } from "@/hooks/useMobile";

interface CButtonProps {
	variant?: "text" | "outlined" | "contained";
	onClick?: () => void;
	label: string;
	type?: "button" | "submit" | "reset";
	isLoading?: boolean;
	sx?: SxProps<Theme>;
}

const CButton = ({
	variant = "contained",
	onClick,
	label,
	type = "button",
	isLoading = false,
	sx,
}: CButtonProps) => {
	const isMobile = useMobile();
	// console.log('isLoading :>> ', isLoading);
	return variant === "contained" ? (
		<Button
			variant={variant}
			onClick={onClick}
			type={type}
			disabled={isLoading}
			sx={{
				...sx,
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				boxShadow: (theme) => theme.palette.boxShadow?.[1],
				px: isMobile ? 1.25 : 2.75,
				py: isMobile ? 0.5 : 1,
				fontWeight: "bold",
				fontSize: isMobile ? "0.875rem" : "1rem",
				textTransform: "capitalize",
				textAlign: "center",
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
				...sx,
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
				px: isMobile ? 2 : 2.75,
				py: isMobile ? 0.5 : 1,
				letterSpacing: -0.25,
				wordSpacing: 0.5,
				lineHeight: 1.8,
				fontWeight: "bold",
				fontSize: isMobile ? "0.875rem" : "1rem",
				textTransform: "capitalize",
				textAlign: "center",
			}}
		>
			{isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
			{isLoading ? "Submitting..." : label}
		</Button>
	);
};

export default CButton;
