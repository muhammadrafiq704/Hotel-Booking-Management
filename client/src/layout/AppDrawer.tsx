import { Box, Drawer, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@/assets/icons/close.svg?react";
import LogoutIcon from "@/assets/icons/logout.svg?react";
import LogoImage from "@/assets/logo/LOGO.svg?react";
import CButton from "@/components/button/Button";
import { StyledNavLink } from "@/styled";
import { navLinks } from "./config";

type AppDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AppDrawer = ({ isOpen, onClose }: AppDrawerProps) => {
	return (
		<Drawer
			open={isOpen}
			onClose={onClose}
			sx={{ "& .MuiDrawer-paper": { width: "100%", maxWidth: "280px" } }}
		>
			{/* close btn  */}
			<IconButton
				onClick={onClose}
				aria-label="close"
				sx={{ position: "absolute", top: 0, right: 0 }}
			>
				<CloseIcon width={28} height={28} />
			</IconButton>

			<Box
				sx={{
					p: 2,
					display: "flex",
					flex: 1,
					flexDirection: "column",
					gap: 2,
					justifyContent: "space-between",
					// border: '1px solid red'
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						// border: '1px solid red',
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<Link to="/">
						<LogoImage width={96} height={96} />
					</Link>
					{navLinks.map((link) => (
						<StyledNavLink
							key={link.path}
							to={link.path}
							sx={(theme) => ({
								color: theme.palette.primary.main,
								width: "100%",
								"&.active": {
									color: theme.palette.primary.main,
								},
								"&:hover": {
									color: theme.palette.primary.main,
								},
							})}
						>
							{link.label}
						</StyledNavLink>
					))}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
					<CButton label="Book Now" variant="contained" />
					<Box
						sx={(theme) => ({
							borderRadius: theme.palette.borderRadius.medium,
							border: `1px solid ${theme.palette.primary.main}`,
							p: 1,
						})}
					>
						<StyledNavLink
							to="tel:+923481234567"
							sx={(theme) => ({
								color: theme.palette.primary.main,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 0.9,
								fontWeight: 700,
								fontSize: "0.875rem",
								textTransform: "capitalize",
							})}
						>
							<LogoutIcon width={24} height={24} />
							Logout
						</StyledNavLink>
					</Box>
				</Box>
			</Box>
		</Drawer>
	);
};

export default AppDrawer;
