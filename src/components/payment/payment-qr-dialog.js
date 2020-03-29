import React from 'react';
import QRCode from 'qrcode.react';
import { crc16xmodem } from 'crc';
import { sprintf } from 'sprintf-js';

const encode = (fieldId, data) => {
    const dataStr = data.toString();
    return `${fieldId}${sprintf("%02d", dataStr.length)}${dataStr}`;
};

const PaymentQRDialog = ({name = "", accountNo = "", amount = ""}) => {

    // see https://www.blognone.com/node/95133 for more info about promptpay
    let encodedAccountNo, isValid = true;
    if (accountNo.length == 10)
        encodedAccountNo = encode('01', '0066' + accountNo.substr(1))
    else if (accountNo.length == 13)
        encodedAccountNo = encode('02', accountNo);
    else
        isValid = false;
    
    const value = `00020101021129370016A000000677010111${encodedAccountNo}5802TH${encode('54', amount)}53037646304`
    const hash = crc16xmodem(value, 0xffff);
    console.log(value, hash);

    return (
        <div className="payment-dialog">
            <div className="title"> Pay via Promptpay </div>
            <div className="name"> {name} </div>
            <div className="account-no"> {accountNo} </div>
            {
                isValid ? (<QRCode
                    value={`${value}${hash.toString(16).toUpperCase().padStart(4, '0')}`}
                    size={256}
                    includeMargin={true}
                />) : (
                    <div> invalid account no [{accountNo}]</div>
                )

            }
        </div>
    );
}

export default PaymentQRDialog;