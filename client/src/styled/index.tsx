import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
	textDecoration: "none",
	fontWeight: 400,
	color: theme.palette.secondary.main,
	transition: "all 0.3s ease",
	letterSpacing: 0.1,
	lineHeight: 1.8,

	"&:hover": {
		color: theme.palette.secondary.main,
		opacity: 0.6,
	},

	"&.active": {
		fontWeight: 700,
		color: theme.palette.secondary.main,
	},
}));
