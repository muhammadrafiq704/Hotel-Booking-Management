import { Badge, Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/icons/cart.svg?react";
import PhoneIcon from "@/assets/icons/phone-white.svg?react";
import LogoImage from "@/assets/logo/LOGO.svg?react";
import { Container } from "@/components";
import CButton from "@/components/button/Button";
import { StyledNavLink } from "@/styled";
import { navLinks } from "./config";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState<boolean | null>(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			setIsScrolled(scrollTop > 400);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Box
			sx={{
				width: "100%",
				height: "100px",
				backdropFilter: isScrolled ? "" : "blur(10px)",
				bgcolor: isScrolled ? "white" : "",
				position: "fixed",
				top: 0,
				left: 0,
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
							<StyledNavLink
								key={link.path}
								to={link.path}
								sx={(theme) => ({
									color: isScrolled ? "black" : "white",
									"&.active": {
										color: isScrolled ? theme.palette.primary.main : "white",
									},
									"&:hover": {
										color: isScrolled ? theme.palette.primary.main : "white",
									},
								})}
							>
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
					<StyledNavLink
						to="tel:+923481234567"
						sx={{
							color: isScrolled
								? (theme) => theme.palette.primary.main
								: "white",
							display: "flex",
							alignItems: "center",
							gap: "4px",
						}}
					>
						<PhoneIcon
							width={28}
							height={28}
							stroke={isScrolled ? "black" : "white"}
						/>
						+92 (348) 123 4567
					</StyledNavLink>
					<IconButton aria-label="cart">
						<Badge badgeContent={0} color="primary" showZero>
							<CartIcon
								width={28}
								height={28}
								stroke={isScrolled ? "black" : "white"}
							/>
						</Badge>
					</IconButton>
					<CButton label="Book Now" variant="contained" />
				</Box>
			</Container>
		</Box>
	);
};

export default Header;
