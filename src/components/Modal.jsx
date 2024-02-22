import React from 'react';
import './CSS/modal.css';

function Modal({details,handleClose }) {
    console.log(details)
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2 className='modal-h2'>{details.title}</h2>
        <p className='modal-p'>{details.content}</p>
        <div className='modal-action'>
          <button className='modal-close-btn' onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
