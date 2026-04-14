import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/icons/cart.svg?react";
import LogoImage from "@/assets/logo/LOGO.svg?react";
import { Container } from "@/components";
import CButton from "@/components/button/Button";
import { StyledNavLink } from "@/styled";
import { navLinks } from "./config";

const Header = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100px",
				backdropFilter: "blur(10px)",
				position: "fixed",
				top: 0,
				left: 0,
				// border: '1px solid blue',
				boxShadow: (theme) => theme.palette.boxShadow?.[2],
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
				zIndex: 10,
			}}
		>
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box sx={{ flex: 1 }}>
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
							<StyledNavLink key={link.path} to={link.path}>
								{link.label}
							</StyledNavLink>
						))}
					</Box>
				</Box>

				<Link to="/">
					<LogoImage width={86} height={86} />
				</Link>

				<Box
					sx={{
						flex: 1,
						display: "flex",
						gap: 4,
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<StyledNavLink to="tel:+923481234567">+92 348 123 4567</StyledNavLink>
					<IconButton aria-label="cart">
						<CartIcon width={28} height={28} />
					</IconButton>
					<CButton label="Book Now" variant="contained" />
				</Box>
			</Container>
		</Box>
	);
};

export default Header;
