import React from 'react';
import './confirm-dialog.scss';

const Dialog = ({ title, question, callback }) => {
  return (
    <div class='modal-dialog confirm-dialog' role='document'>
      <div class='modal-content'>
        <div class='modal-header'>
          <h5 class='modal-title'> {title}</h5>
          <button
            type='button'
            class='close'
            aria-label='Close'
            onClick={() => callback(false)}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div class='modal-body'>
          <p>{question}</p>
        </div>
        <div class='modal-footer'>
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => callback(true)}
            autoFocus>
            Yes
          </button>
          <button
            type='button'
            class='btn btn-secondary'
            onClick={() => callback(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
