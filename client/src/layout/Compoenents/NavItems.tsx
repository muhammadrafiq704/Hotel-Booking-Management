import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@/assets/icons/menu.svg?react";
import MenuIconPrimary from "@/assets/icons/menu-primary.svg?react";
import { useMobile } from "@/hooks/useMobile";
import { StyledNavLink } from "@/styled";
import AppDrawer from "../AppDrawer";
import { navLinks } from "../config";

const NavItems = ({ scrolling }: { scrolling: boolean | null }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isMobile = useMobile();
	return (
		<>
			<Box sx={{ flex: 1 }}>
				{isMobile ? (
					<IconButton aria-label="menu" onClick={() => setIsOpen(!isOpen)}>
						{scrolling ? (
							<MenuIconPrimary width={32} height={32} stroke="black" />
						) : (
							<MenuIcon width={32} height={32} stroke="white" />
						)}
					</IconButton>
				) : (
					<Box
						sx={{
							px: 2,
							display: "flex",
							gap: 4,
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						{navLinks.map((link) => (
							<StyledNavLink
								key={link.path}
								to={link.path}
								sx={(theme) => ({
									color: scrolling ? "black" : "white",
									"&.active": {
										color: scrolling ? theme.palette.primary.main : "white",
									},
									"&:hover": {
										color: scrolling ? theme.palette.primary.main : "white",
									},
								})}
							>
								{link.label}
							</StyledNavLink>
						))}
					</Box>
				)}
			</Box>
			<AppDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};

export default NavItems;
