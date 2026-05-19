import { Badge, Box, IconButton } from "@mui/material";
import { useState } from "react";
import PhoneIcon from "@/assets/icons/phone-white.svg?react";
import PrimaryShoppingCart from "@/assets/icons/shopping-cart-primary.svg?react";
import SecondaryShoppingCart from "@/assets/icons/shopping-cart-secondary.svg?react";
import CButton from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { useMobile } from "@/hooks/useMobile";
import { StyledNavLink } from "@/styled";
import SearchResultForm from "./SearchResultForm";

const ContactAndCart = ({ scrolling }: { scrolling: boolean | null }) => {
	const isMobile = useMobile();
	const [open, setOpen] = useState<boolean>(false);
	return (
		<>
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
						color: scrolling ? (theme) => theme.palette.primary.main : "white",
						display: isMobile ? "none" : "flex",
						alignItems: "center",
						gap: "4px",
					}}
				>
					<PhoneIcon
						width={28}
						height={28}
						stroke={scrolling ? "black" : "white"}
					/>
					+92 (348) 123 4567
				</StyledNavLink>
				<Box sx={{ display: "flex", gap: 0.5 }}>
					<IconButton aria-label="cart">
						<Badge
							badgeContent={0}
							color="primary"
							showZero
							anchorOrigin={{ vertical: "top", horizontal: "left" }}
						>
							{scrolling ? (
								<PrimaryShoppingCart width={28} height={28} stroke="black" />
							) : (
								<SecondaryShoppingCart width={28} height={28} stroke="white" />
							)}
						</Badge>
					</IconButton>
					<CButton
						label="Book Now"
						variant="contained"
						sx={{ display: isMobile ? "none" : "flex" }}
						onClick={() => setOpen(!open)}
					/>
				</Box>
			</Box>
			<Modal
				open={open}
				onClose={() => setOpen(!open)}
				title="Searching your stay"
				size="md"
			>
				<SearchResultForm onClose={() => setOpen(!open)} />
			</Modal>
		</>
	);
};

export default ContactAndCart;
