import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: ComponentProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      data-testid="confirmation-dialog-wrapper"
    >
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          data-testid="confirmation-dialog-cancel-button"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          data-testid="confirmation-dialog-confirm-button"
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              color="inherit"
              data-testid="confirmation-dialog-loading-spinner"
            />
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
