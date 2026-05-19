import type { ChipOwnProps, SxProps } from "@mui/material";
import { Box, Chip } from "@mui/material";

export const Container = ({
	children: Children,
	sx,
}: {
	children: React.ReactNode;
	sx?: SxProps;
}) => {
	return (
		<Box
			sx={{
				maxWidth: "1280px",
				width: "100%",
				margin: "0 auto",
				px: 2,
				// border: '1px solid green',
				...sx,
			}}
		>
			{Children}
		</Box>
	);
};

export const FlexBetween = ({
	children: Children,
	gap,
	sx,
}: {
	children: React.ReactNode;
	gap?: number;
	sx?: SxProps;
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: gap,
				...sx,
			}}
		>
			{Children}
		</Box>
	);
};

export const CChip = ({
	children,
	color,
	variant = "filled",
	sx,
}: {
	children: React.ReactNode;
	color?: ChipOwnProps["color"];
	variant?: ChipOwnProps["variant"];
	sx?: SxProps;
}) => {
	return (
		<Chip
			variant={variant}
			color={color}
			sx={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "4px 12px",
				borderRadius: 16,
				...(!color && variant === "filled"
					? {
							backgroundColor: (theme) => theme.palette.shades?.shade10,
							color: (theme) => theme.palette.primary.main,
						}
					: {}),
				fontSize: 12,
				fontWeight: 500,
				...sx,
			}}
			label={children}
		/>
	);
};
