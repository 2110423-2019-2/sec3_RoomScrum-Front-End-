import React, { useState } from 'react';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';

// logic wrapper
export const ConfirmButton = ({
        className, children,
        question, title, action,
}) => {
    // dialog state
    const [isOpen, setOpen] = useState(false);

    const dialogCallback = (isConfirmed) => {
        setOpen(false);
        if (!isConfirmed) return;
        action();
    } 

    return (
        <div className={className} onClick={() => setOpen(true)}>
            {children} 
            <Dialog isOpen={isOpen} onClose={() => setOpen(false)}>
                <ConfirmDialog
                    callback={dialogCallback}
                    question={question}
                    title={title}
                />
            </Dialog>
        </div>
    )
}