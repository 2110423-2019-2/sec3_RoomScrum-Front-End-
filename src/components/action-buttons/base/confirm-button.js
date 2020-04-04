import React, { useState, useRef } from 'react';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';

// logic wrapper
export const ConfirmButton = ({
        className, children,
        question, title, action,
}) => {
    const [showDialog, setShowDialog] = useState(false);

    const dialogCallback = (isConfirmed) => {
        setShowDialog(false);
        if (!isConfirmed) return;
        action();
    } 

    return (
        <>
            <div className={className} onClick={(evt) => {
                setShowDialog(true);
            }}>
                {children}
            </div>
            <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
                <ConfirmDialog
                    callback={dialogCallback}
                    question={question}
                    title={title}
                />
            </Dialog>
        </>
    )
}
