import React from 'react';
import Modal from 'react-modal';
import './dialog.scss'

const Dialog = ({children, isOpen, onClose}) => {
    return (
        <Modal
            overlayClassName="default-dialog"
            className="default-dialog"
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            {children}
        </Modal>
    )
}

export default Dialog;