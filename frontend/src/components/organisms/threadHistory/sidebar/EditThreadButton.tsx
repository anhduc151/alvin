import { useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, Input } from "@mui/material";
import { ClientError, IThread, accessTokenState } from "@chainlit/react-client";
import { apiClientState } from "state/apiClient";

interface Props {
  threadId: string;
  threadData: IThread;
  onEdit: () => void;
}

const EditThreadButton = ({ threadId, threadData, onEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const [newThreadName, setNewThreadName] = useState<string>("");
  const accessToken = useRecoilValue(accessTokenState);
  const apiClient = useRecoilValue(apiClientState);

  const handleClickOpen = () => {
    setOpen(true);
    setNewThreadName(threadData.name || "");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const res = await apiClient.editThread(
        threadId,
        { ...threadData, name: newThreadName },
        accessToken!
      );
      if(res){
        toast.success("Thread updated successfully");
        onEdit();
      }
    } catch (error) {
      if (error instanceof ClientError) {
        toast.error(error.message);
      }
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen} sx={{ p: "2px" }}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Thread</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Input
              type="text"
              value={newThreadName}
              onChange={(e) => setNewThreadName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleSave}
            loadingPosition="end"
            variant="contained"
            color="primary"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditThreadButton;
