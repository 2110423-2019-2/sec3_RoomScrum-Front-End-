import React, { useState, useRef } from 'react';
import Dialog from 'src/components/common/dialog';


/*
    How to use
    <DialogButton
        className="..." // optional classname for wrapper
        render={
            onClose => <SomeDialog onClose={onClose}/> // SomeDialog may call onClose to close dialog
        }
    >  
        <button> a button </button> // element to be a trigger
    </DialogButton>
*/
export const DialogButton = ({
        className, 
        children, // children to be used as trigger
        render, // render function for dialog, it may use passed onClose to close dialog
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const closeDialog = () => setShowDialog(false);

    return (
        <>
            <span className={className} onClick={() => setShowDialog(true)}>
                {children}
            </span>
            <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
                {render(closeDialog)}
            </Dialog>
        </>
    )
}