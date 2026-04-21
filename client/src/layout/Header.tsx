import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LogoImage from "@/assets/logo/LOGO.svg?react";
import { Container } from "@/components";
import { useMobile } from "@/hooks/useMobile";
import ContactAndCart from "./Compoenents/ContactAndCart";
import NavItems from "./Compoenents/NavItems";
import { StyledHeaderContainer } from "./styled";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState<boolean | null>(false);
	const isMobile = useMobile();

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
		<StyledHeaderContainer isScrolled={isScrolled}>
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<NavItems scrolling={isScrolled} />
				{/* logo section  */}
				<Link to="/">
					<LogoImage width={isMobile ? 64 : 86} height={isMobile ? 64 : 86} />
				</Link>
				{/* contact and cart section  */}
				<ContactAndCart scrolling={isScrolled} />
			</Container>
		</StyledHeaderContainer>
	);
};

export default Header;
