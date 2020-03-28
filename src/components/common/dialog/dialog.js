import React from 'react';
import Modal from 'react-modal';
import './dialog.scss'

const Dialog = ({children, isOpen, onClose}) => {
    return (
        <Modal
            overlayClassName="z-index-999"
            className="default-dialog"
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            {children}
        </Modal>
    )
}

export default Dialog;