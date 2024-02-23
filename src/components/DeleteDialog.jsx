import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function DeleteDialog({open, handleClose, handleConfirm}) {
    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delte the note, This action can note be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='modal-cancle-btn' autoFocus onClick={handleClose}>
            Cancle
          </button>
          <button className='modal-close-btn' onClick={handleConfirm} autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteDialog