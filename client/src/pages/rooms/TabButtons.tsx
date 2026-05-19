import { Tab, Tabs } from "@mui/material";

interface TabButtonsProps {
	selectedTab: string;
	onTabChange: (tab: string) => void;
	label: string;
	tabButtons: { value: string; label: string }[];
}

export default function TabButtons({
	selectedTab,
	onTabChange,
	label,
	tabButtons,
}: TabButtonsProps) {
	function a11yProps(index: number) {
		return {
			id: `horizontal-tab-${index}`,
			"aria-controls": `horizontal-tabpanel-${index}`,
		};
	}

	return (
		<Tabs
			value={selectedTab}
			aria-label={label}
			sx={{
				"& .MuiTabs-flexContainer": {
					gap: 2,
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				},

				"& .MuiButtonBase-root": {
					minWidth: "auto",
					padding: "10px",
				},
				minHeight: "auto",

				"& .MuiTab-root": {
					minHeight: "auto",
				},
				"& .MuiTabs-indicator": {
					display: "none",
				},
			}}
		>
			{tabButtons.map((tab, index) => (
				<Tab
					key={tab.value}
					label={tab.label}
					value={tab.value}
					onClick={() => onTabChange(tab.value)}
					{...a11yProps(index)}
					sx={(theme) => ({
						textTransform: "none",
						fontWeight: selectedTab === tab.value ? "bold" : "normal",
						bgcolor:
							selectedTab === tab.value ? theme.palette.primary.main : "",

						p: 4,
						fontSize: 18,
						transition: "all 0.5s",
						color: theme.palette.text.primary,
						maxWidth: 400,
						width: 150,
						"&.Mui-selected": {
							color: "#fff",
							backgroundColor: theme.palette.primary.main,
						},

						"&:hover": {
							color: "#fff",
							backgroundColor: theme.palette.primary.main,
						},
					})}
				/>
			))}
		</Tabs>
	);
}
