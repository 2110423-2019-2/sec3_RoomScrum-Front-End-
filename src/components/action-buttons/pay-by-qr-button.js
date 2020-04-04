import React from 'react';
import { DialogButton } from './base/dialog-button';
import PaymentQRDialog from '../payment';
import { Button } from '../common';


export const PayByQRButton = ({
    accountNo, amount, displayName, children
}) => {
    return (
        <DialogButton
            render={
                onClose => <PaymentQRDialog
                    accountNo={accountNo}
                    amount={amount}
                    name={displayName}
                    onClose={onClose}
                />
            }
        >
           {children || <Button type="primary" name="[test] Pay new"/>}
        </DialogButton> 
    );
}