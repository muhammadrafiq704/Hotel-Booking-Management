import { Box } from "@mui/material";
import CButton from "@/components/button/Button";
import Modal from "@/components/modal/Modal";

type BookingConfirmationModalProps = {
	open: boolean;
	onClose: () => void;
};

const BookingConfirmationModal = ({
	open,
	onClose,
}: BookingConfirmationModalProps) => {
	return (
		<Modal title="Confirm Your Booking" open={open} onClose={onClose}>
			<Box>
				<h1>Your room reservation done while you click confirm button!</h1>
				<CButton label="Confirm Reservation" type="submit" />
			</Box>
		</Modal>
	);
};

export default BookingConfirmationModal;
