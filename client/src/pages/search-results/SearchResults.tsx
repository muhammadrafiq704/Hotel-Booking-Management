import { Box, Grid } from "@mui/material";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Container, NotFound } from "@/components";
import CCard from "@/components/card/Card";
import CTypography from "@/components/typography/CTypography";
import SearchResultForm from "@/layout/Compoenents/SearchResultForm";
import PageLayout from "@/layout/PageLayout";
import type { Room } from "@/types/types";

const SearchResults = () => {
	const [searchParams] = useSearchParams();

	const children = searchParams.get("children") || "";
	const adults = searchParams.get("adults") || "";
	const checkInDateStr = searchParams.get("checkInDate");
	const checkOutDateStr = searchParams.get("checkOutDate");

	const searchData = {
		children: Number(children),
		adults: Number(adults),
		checkInDate: checkInDateStr ? new Date(checkInDateStr) : null,
		checkOutDate: checkOutDateStr ? new Date(checkOutDateStr) : null,
	};

	const { data } = useLoaderData() as { data: Room[] };
	// console.log("data :>> ", data);

	return (
		<PageLayout title="Your Search Results">
			<Container>
				<Box py={4}>
					<CTypography
						sx={{
							fontWeight: 500,
							textAlign: "center",
							mb: 4,
							fontStyle: "italic",
							color: "text.secondary",
							fontSize: { xs: "1.2rem", md: "1.5rem" },
						}}
					>
						{`Your Search Results for children: ${children} and Adults: ${adults}`}
					</CTypography>
					{data.length === 0 ? (
						<NotFound message="No Rooms Found" />
					) : (
						<Grid container spacing={4}>
							<Grid
								size={{ xs: 12, md: 4 }}
								sx={{
									height: "fit-content",
									position: "sticky",
									top: "120px",
									zIndex: 5,
								}}
							>
								<SearchResultForm formData={searchData} />
							</Grid>
							<Grid size={{ xs: 12, md: 8 }}>
								{data.map((room) => (
									<Box key={room._id} mb={4}>
										<CCard
											orientation="horizontal"
											room={room}
											actionType="book"
										/>
									</Box>
								))}
							</Grid>
						</Grid>
					)}
				</Box>
			</Container>
		</PageLayout>
	);
};

export default SearchResults;
