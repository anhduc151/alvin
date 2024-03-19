import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AccentButton, RegularButton } from '@chainlit/react-components';
import { Translator } from 'components/i18n';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

export default function NewChatDialog({
  open,
  handleClose,
  handleConfirm
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      id="new-chat-dialog"
      PaperProps={{
        sx: {
          backgroundImage: 'none', 
          border: "1px solid #2b2a2a"
        }
      }}
    >

      <DialogTitle id="alert-dialog-title">
        {/* {<Translator path="components.molecules.newChatDialog.createNewChat" />} */}
        Create new chat?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           {/* <Translator path="components.molecules.newChatDialog.clearChat" />  */}
          This will clear the current messages and start a new chat.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <RegularButton onClick={handleClose}>
          {/* <Translator path="components.molecules.newChatDialog.cancel" /> */}
          Cancel
        </RegularButton>

        <AccentButton
          id="confirm"
          variant="outlined"
          onClick={handleConfirm}
          autoFocus
          sx={{ border: "1px solid #1bc740", color: "#1bc740"}}
        >
          {/* <Translator path="components.molecules.newChatDialog.confirm" /> */}
          Confirm
        </AccentButton>
        
      </DialogActions>
    </Dialog>
  );
}
