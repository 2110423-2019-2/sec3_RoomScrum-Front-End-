import React from 'react';
import { DialogButton } from './base/dialog-button';
import { Button } from '../common';
import ApplicationInfoDialog from 'src/views/musician-dashboard/my-applications/application-info';

// display event and their application/contract info, must pass APPLICATION (not event )
export const ViewEventInfoButton = ({
    className,
    application,
    children, // child element to trigger
}) => {
    return (
        <DialogButton
            className={className}
            render={onClose => <ApplicationInfoDialog
                application={application}
                onClose={onClose}
            />}
        >
            {children || <Button type="primary" name="View Info"/>}
        </DialogButton>
    )
}