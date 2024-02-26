// import { useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { toast } from 'sonner';

// import { IconButton } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import EditIcon from '@mui/icons-material/Edit';
// import Button from '@mui/material/Button';

// import { ClientError, accessTokenState } from '@chainlit/react-client';
// import { Translator } from 'components/i18n';
// import { apiClientState } from 'state/apiClient';

// interface Props {
//   threadId: string;
//   onEdit: () => void;
// }

// const EditThreadButton = ({ threadId, onEdit }: Props) => {
//   const [open, setOpen] = useState(false);
//   const accessToken = useRecoilValue(accessTokenState);
//   const apiClient = useRecoilValue(apiClientState);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleConfirm = async () => {
//     try {
//       const result = await apiClient.editThread(threadId, threadData, accessToken);
//       await toast.promise(Promise.resolve(result), {
//         loading: (
//           <Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.saving" />
//         ),
//         success: () => {
//           onEdit(); // Gọi hàm onEdit để thực hiện hành động cần thiết
//           return <Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.threadEdited" />;
//         },
//         error: (err) => {
//           if (err instanceof ClientError) {
//             return <span>{err.message}</span>;
//           } else {
//             return <span></span>;
//           }
//         }
//       });
//     } catch (error) {
//     }
//     handleClose();
//   };
  
  

//   return (
//     <>
//       <IconButton size="small" onClick={handleClickOpen} sx={{ p: '2px' }}>
//         <EditIcon />
//       </IconButton>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle><Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.editThread" /></DialogTitle>
//         <DialogContent>
//           {/* Your form fields for editing thread */}
//           <DialogContentText>
//             {/* Your form fields for editing thread */}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary"><Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.cancel" /></Button>
//           <LoadingButton onClick={handleConfirm} loadingIndicator={<Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.saving" />} loadingPosition="end" variant="contained" color="primary">
//             <Translator path="components.organisms.threadHistory.sidebar.EditThreadButton.save" />
//           </LoadingButton>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EditThreadButton;
