import { Box, Divider, Grid, List } from "@mui/material";
import MailIcon from "@/assets/icons/mail.svg?react";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg?react";
import LogoIcon from "@/assets/logo/LOGO.svg?react";
import { Container } from "@/components";
import CTypography from "@/components/typography/CTypography";
import { StyledNavLink } from "@/styled";
import { legalsLinks, navLinks, type SocialLink, socialLinks } from "./config";

const Footer = () => {
	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				p: 6,
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.secondary.main,
				mt: 10,
			})}
		>
			<Container>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 3 }}>
						<LogoIcon width={120} height={120} />
						<CTypography
							variant="h6"
							sx={{ fontSize: "1rem", lineHeight: 1.5, wordSpacing: 0.5 }}
						>
							Hotel Booking Management System (HBMS) is a comprehensive solution
							for managing hotel operations.
						</CTypography>
					</Grid>
					<Grid size={{ xs: 12, sm: 3 }}>
						<CTypography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
							Bookings
						</CTypography>
						<List sx={{ listStyleType: "none" }}>
							{navLinks.map((link) => (
								<StyledNavLink
									to={link.path}
									key={link.path}
									sx={{
										display: "list-item",
										fontSize: "1rem",
										letterSpacing: 0.1,
										pb: 1,
									}}
								>
									{link.label}
								</StyledNavLink>
							))}
						</List>
					</Grid>
					<Grid size={{ xs: 12, sm: 3 }}>
						<CTypography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
							Legals
						</CTypography>
						<List sx={{ listStyleType: "none" }}>
							{legalsLinks.map((link) => (
								<StyledNavLink
									to={link.path}
									key={link.path}
									sx={{
										display: "list-item",
										fontSize: "1rem",
										letterSpacing: 0.1,
										pb: 1,
									}}
								>
									{link.label}
								</StyledNavLink>
							))}
						</List>
					</Grid>
					<Grid size={{ xs: 12, sm: 3 }}>
						<CTypography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
							Contact Us
						</CTypography>
						<List sx={{ listStyleType: "none" }}>
							<StyledNavLink
								to="mailto:contact@hotelbooking.com"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									fontSize: "1rem",
									letterSpacing: 0.1,
									pb: 1,
								}}
							>
								<MailIcon width={20} height={20} /> contact@hotelbooking.com
							</StyledNavLink>
							<StyledNavLink
								to="https://wa.me/1234567890"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									fontSize: "1rem",
									letterSpacing: 0.1,
									pb: 1,
								}}
							>
								<WhatsAppIcon width={20} height={20} /> +1 (234) 567-890
							</StyledNavLink>
							<CTypography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
								Follow Us
							</CTypography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									mt: 1,
								}}
							>
								{socialLinks.map((link: SocialLink) => (
									<StyledNavLink
										to={link.path}
										key={link.path}
										sx={{
											display: "flex",
											alignItems: "center",
											gap: "8px",
											fontSize: "1rem",
											letterSpacing: 0.1,
											pb: 1,
										}}
									>
										{link.icon}
									</StyledNavLink>
								))}
							</Box>
						</List>
					</Grid>

					<Divider
						sx={{
							width: "100%",
							my: 4,
							backgroundColor: "rgba(255, 255, 255, 0.2)",
						}}
					/>
					<Grid size={{ xs: 12, sm: 12 }} sx={{ textAlign: "center" }}>
						&copy; {new Date().getFullYear()} Hotel Booking Management. All
						rights reserved.
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Footer;
