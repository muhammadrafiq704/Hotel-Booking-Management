import { Box } from "@mui/material";
import { Container } from "@/components";
import "simplebar-react/dist/simplebar.min.css";
import { useMobile } from "@/hooks/useMobile";
import HeroOverlay from "./HeroOverlay";
import IntroSection from "./IntroSection";
import RecentBooking from "./RecentBooking";

const Hero = () => {
	const isMobile = useMobile();

	const isMobileCss = {
		display: "flex",
		flexDirection: "column",
		gap: 0,
	};
	return (
		<Box
			sx={{
				minHeight: "100vh",
				position: "relative",
				// border: '4px solid blue',
				...(isMobile ? isMobileCss : {}),
			}}
		>
			<Box
				sx={{
					width: "100%",
					minHeight: "100dvh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					backgroundImage: "url('/src/assets/bg/background-image-1.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					// border: '4px solid green',
				}}
			>
				{/* <Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						overflow: "hidden",
						zIndex: 0,
					}}
				> */}
				{/* <VideoSlider /> */}
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						backgroundColor: "rgba(0,0,0,0.2)",
						zIndex: 1,
					}}
				/>
				{/* </Box> */}
				<Container
					sx={{
						zIndex: 2,
						display: "flex",
						gap: isMobile ? 4 : 4,
						flexDirection: { xs: "column", sm: "row" },
						alignItems: "center",
						justifyContent: "space-between",
						overflow: "hidden",
						// pt: isMobile ? 14 : 0,
					}}
				>
					{/* intro section component   */}
					<IntroSection />
					{/* recent booking component  */}
					<RecentBooking />
				</Container>
			</Box>
			<HeroOverlay />
		</Box>
	);
};

export default Hero;
