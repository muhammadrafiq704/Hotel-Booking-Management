import { Box } from "@mui/material";
import { Container } from "@/components";
import CButton from "@/components/button/Button";
import CTypography from "@/components/typography/CTypography";
import { useMobile } from "@/hooks/useMobile";

const Passion = () => {
	const isMobile = useMobile();
	return (
		<Container sx={{ mt: { xs: 16, md: 20 } }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					flexWrap: "wrap",
					alignItems: "flex-start",
					gap: "60px",
				}}
			>
				<Box sx={{ flex: 1 }}>
					<img
						src="/src/assets/images/hotel-image.jpg"
						alt="hotel-image"
						style={{ objectFit: "cover", width: "100%", height: "100%" }}
						loading="lazy"
					/>
				</Box>
				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "flex-start",
						gap: "30px",
					}}
				>
					<CTypography sx={{ fontWeight: 600, letterSpacing: 0.1 }}>
						Our Passion
					</CTypography>
					<Box>
						<CTypography
							sx={{
								fontSize: isMobile ? "2rem" : "3rem",
								fontWeight: 700,
								lineHeight: 1,
							}}
						>
							Capturing the Magic of{" "}
						</CTypography>
						<CTypography
							// variant="h3"
							sx={{
								fontSize: isMobile ? "2rem" : "3rem",
								color: "#FFD700",
								fontStyle: "italic",
								fontWeight: 700,
								lineHeight: 1.2,
							}}
						>
							Mountain Landscapes
						</CTypography>
					</Box>
					<CTypography
						variant="body1"
						sx={{ color: "grey", fontSize: "1.2rem" }}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
						autem ea exercitationem doloremque dicta error. Enim facere, minus
						ex ea sed atque deserunt impedit quia beatae, laborum alias corrupti
						debitis!
					</CTypography>
					<CButton label="Book Your Stay" variant="outlined" />
				</Box>
			</Box>
		</Container>
	);
};

export default Passion;
