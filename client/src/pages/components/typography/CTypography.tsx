import { type SxProps, Typography, type TypographyProps } from "@mui/material";

type CTypographyProps = {
	variant?: TypographyProps["variant"];
	children: string;
	sx?: SxProps;
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
