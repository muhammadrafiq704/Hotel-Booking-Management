import { Box, styled, Typography } from "@mui/material";
import {
	isRouteErrorResponse,
	useNavigate,
	useRouteError,
} from "react-router-dom";
import CButton from "../button/Button";

const ErrorBoundary = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	const StyledErrorWrapper = styled(Box)({
		minHeight: "100dvh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "10px",
	});

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<StyledErrorWrapper>
					<Typography variant="h3" fontStyle="italic">
						{error.statusText}
					</Typography>
					<Typography variant="body1" fontStyle="italic" color="gray">
						No routes matched for this routes
					</Typography>
					<CButton onClick={() => navigate(-1)} label="Go Back" />
				</StyledErrorWrapper>
			);
		}
	}
	return (
		<StyledErrorWrapper>
			<Typography variant="h3" fontStyle="italic">
				Something went wrong!
			</Typography>
			<Typography variant="body1" fontStyle="italic" color="gray">
				It might be network or server error
			</Typography>
			<CButton onClick={() => navigate(-1)} label="Go Back" />
		</StyledErrorWrapper>
	);
};

export default ErrorBoundary;
