import type React from "react";
import FacebookIcon from "@/assets/icons/facebook.svg?react";
import InstagramIcon from "@/assets/icons/instagram.svg?react";
import TikTokIcon from "@/assets/icons/tiktok.svg?react";

type NavLink = {
	label: string;
	path: string;
};
export const navLinks: NavLink[] = [
	{
		label: "Home",
		path: "/",
	},
	{
		label: "Rooms",
		path: "/rooms",
	},
	{
		label: "Bookings",
		path: "/bookings",
	},
	{
		label: "Recommendations",
		path: "/recommendations",
	},
];

export type SocialLink = NavLink & {
	icon: React.ReactNode;
};

export const socialLinks: SocialLink[] = [
	{
		label: "Facebook",
		path: "https://www.facebook.com",
		icon: <FacebookIcon width={32} height={32} />,
	},
	{
		label: "Instagram",
		path: "https://www.instagram.com",
		icon: <InstagramIcon width={32} height={32} />,
	},
	{
		label: "TikTok",
		path: "https://www.tiktok.com",
		icon: <TikTokIcon width={32} height={32} />,
	},
];
export const legalsLinks: NavLink[] = [
	{
		label: "Privacy Policy",
		path: "/privacy-policy",
	},
	{
		label: "Terms of Service",
		path: "/terms-of-service",
	},
	{
		label: "Refund Policy",
		path: "/refund-policy",
	},
];
