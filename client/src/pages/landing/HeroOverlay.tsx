import { Box } from "@mui/material";
import { useMobile } from "@/hooks/useMobile";
import SearchResultForm from "@/layout/Compoenents/SearchResultForm";

const HeroOverlay = () => {
	const isMobile = useMobile();
	return (
		<Box
			sx={(theme) => ({
				[theme.breakpoints.down("md")]: {
					position: "relative",
				},
				[theme.breakpoints.up("md")]: {
					position: "absolute",
					bottom: 0,
					left: "50%",
					width: "100%",
					maxWidth: "1200px",
					transform: "translate(-50%, 50%)",
					px: 2,
				},

				zIndex: 2,
				// border: '1px solid red',
			})}
		>
			<Box
				sx={{
					px: { xs: 2, sm: 4 },
					py: 2,
					bgcolor: "white",
					boxShadow: (theme) => theme.palette.boxShadow?.[0],
					borderRadius: (theme) => theme.shape.borderRadius,

					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
					alignItems: "center",
				}}
			>
				<SearchResultForm orientation={isMobile ? "column" : "row"} />
			</Box>
		</Box>
	);
};

export default HeroOverlay;
