import { Outlet } from "react-router-dom";
import { StyledAuthContainer, StyledAuthLayoutContainer } from "./styled";

const AuthLayout = () => {
	return (
		<StyledAuthContainer px={1.5}>
			<StyledAuthLayoutContainer>
				<Outlet />
			</StyledAuthLayoutContainer>
		</StyledAuthContainer>
	);
};

export default AuthLayout;
