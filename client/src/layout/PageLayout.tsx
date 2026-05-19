import { Box } from "@mui/material";
import PageHero from "./PageHero";

type PageLayoutProps = {
	title: string;
	description?: string;
	children: React.ReactNode;
	image?: string;
	actionBtn?: boolean;
};

export default function PageLayout({
	title,
	description,
	children,
	image,
	actionBtn,
}: PageLayoutProps) {
	return (
		<Box>
			<PageHero
				title={title}
				description={description}
				image={image}
				actionBtn={actionBtn}
			/>
			<Box>{children}</Box>
		</Box>
	);
}
