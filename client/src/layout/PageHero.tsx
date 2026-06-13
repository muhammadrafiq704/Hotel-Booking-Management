import { Box } from "@mui/material";
import { ImageUploadApi } from "@/api/HBMSAPI";
import CButton from "@/components/button/Button";
import CTypography from "@/components/typography/CTypography";

type PageHeroProps = {
	title: string;
	description?: string;
	image?: string;
	actionBtn?: boolean;
};

const IMAGE_BASE_URL = ImageUploadApi.defaults.baseURL;

const PageHero = ({
	title,
	description,
	image,
	actionBtn = false,
}: PageHeroProps) => {
	return (
		<Box
			pt={10}
			maxHeight={400}
			height={400}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundImage: `url(${image ? `${IMAGE_BASE_URL}/${image}` : "/src/assets/images/delux-room.webp"})`,
				backgroundSize: "cover",
				backgroundPosition: "bottom",
				backgroundAttachment: "fixed",
				position: "relative",
				color: "#fff",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					inset: 0,
					position: "absolute",
					backgroundColor: "rgba(0,0,0,0.4)",
				}}
			/>
			<Box
				sx={{
					position: "relative",
					textAlign: "center",
					maxWidth: 800,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 4,
				}}
			>
				{title && (
					<CTypography
						variant="h2"
						sx={{
							fontWeight: 700,
							lineHeight: 1,
							fontSize: { xs: 42, md: 64 },
							letterSpacing: -0.7,
						}}
					>
						{title}
					</CTypography>
				)}
				{description && (
					<CTypography
						variant="body1"
						sx={{
							fontWeight: 400,
							color: "#fff",
							opacity: 0.8,
							fontSize: 18,
							maxWidth: 600,
							textAlign: "center",
							lineHeight: 1.3,
						}}
					>
						{description}
					</CTypography>
				)}
				{actionBtn && <CButton variant="contained" label="Book Now" />}
			</Box>
		</Box>
	);
};

export default PageHero;
