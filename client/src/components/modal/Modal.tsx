import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

type CustomModalProps = {
	open: boolean;
	onClose: () => void;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	children: React.ReactNode;
	title?: string;
};

export default function Modal({
	open,
	onClose,
	size = "md",
	title,
	children,
}: CustomModalProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="customized-dialog-title"
			aria-describedby="customized-dialog-description"
			maxWidth={size}
			fullWidth
			sx={{
				"& .MuiDialog-paper": {
					borderRadius: 8,
				},
			}}
		>
			<DialogTitle
				id="customized-dialog-title"
				fontWeight={600}
				fontSize="1.5rem"
			>
				{title}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={(theme) => ({
					position: "absolute",
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent sx={{ flex: 1, overflowY: "auto" }} dividers>
				{children}
			</DialogContent>
		</Dialog>
	);
}
