import { Button } from "@mui/material";

interface CButtonProps {
	variant?: "text" | "outlined" | "contained";
	color?: "primary" | "secondary";
	onClick?: () => void;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const CButton = ({
	variant = "contained",
	color = "primary",
	onClick,
	children,
	type = "button",
}: CButtonProps) => {
	return variant === "contained" ? (
		<Button
			variant={variant}
			color={color}
			onClick={onClick}
			type={type}
			sx={{
				borderRadius: (theme) => theme.palette.borderRadius.extraLarge,
				maxWidth: "150px",
				width: "100%",
				boxShadow: (theme) => theme.palette.boxShadow?.[0],
				px: 2,
				py: 1.5,
				fontWeight: "bold",
				fontSize: "1rem",
				alignSelf: "center",
				textTransform: "capitalize",
			}}
		>
			{children}
		</Button>
	) : (
		<Button
			variant={variant}
			color={color}
			onClick={onClick}
			type={type}
			sx={{ borderRadius: (theme) => theme.palette.borderRadius.medium }}
		>
			{children}
		</Button>
	);
};

export default CButton;
