import { Box } from "@mui/material";
import CButton from "@/components/button/Button";
import CTypography from "@/components/typography/CTypography";
import { useMobile } from "@/hooks/useMobile";

const IntroSection = () => {
	const isMobile = useMobile();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 2,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					alignItems: "flex-start",
					maxWidth: "550px",
				}}
			>
				<CTypography
					sx={(theme) => ({
						fontSize: isMobile ? "2rem" : "5.5rem",
						fontWeight: 700,
						color: theme.palette.secondary.main,
						letterSpacing: 0.5,
						lineHeight: 1.2,
					})}
				>
					Find Your{" "}
					<span style={{ color: "#FFD700", fontStyle: "italic" }}>
						Perfect Stay
					</span>
				</CTypography>
				<CTypography
					sx={(theme) => ({
						fontSize: isMobile ? "1rem" : "1.25rem",
						color: theme.palette.secondary.main,
						opacity: 0.6,
					})}
				>
					Discover and book hotels with ease, ensuring a seamless travel
					experience.
				</CTypography>
			</Box>
			<CButton label="Explore Rooms" variant="contained" />
		</Box>
	);
};

export default IntroSection;
