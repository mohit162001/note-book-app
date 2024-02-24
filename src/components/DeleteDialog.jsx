import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import './CSS/notehistory.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function DeleteDialog({open, handleClose, handleConfirm,noteTitle}) {
    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle>
          {<h2 className='delete-h2'>Are you sure ?</h2>}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            <p className='delelte-p'>Are you sure you want to delete  <span className='selected-note-title'> {noteTitle}</span>?</p>
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