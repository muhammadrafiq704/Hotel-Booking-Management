import {
	type SxProps,
	type Theme,
	Typography,
	type TypographyProps,
} from "@mui/material";

type CTypographyProps = {
	variant?: TypographyProps["variant"];
	children: React.ReactNode;
	sx?: SxProps<Theme>;
};

const CTypography = ({
	variant = "body1",
	children,
	sx,
	...props
}: CTypographyProps) => {
	return (
		<Typography variant={variant} sx={sx} {...props}>
			{children}
		</Typography>
	);
};

export default CTypography;
