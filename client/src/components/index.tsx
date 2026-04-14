import type { SxProps } from "@mui/material";
import { Box } from "@mui/system";

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
