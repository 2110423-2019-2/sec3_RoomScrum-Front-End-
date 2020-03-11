import React from 'react';
import './confirm-dialog.scss';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ConfirmDialog = ({ title, question, callback }) => {
    return (
        <div className="ban-confirm-dialog">
            <div className="icon">
                <FontAwesomeIcon icon={faExclamationTriangle}/>
            </div>
            <div className="title"> {title}</div>
            <div className="question"> {question} </div>
            <div className="centered">
                <button className="button button-no" onClick={() => callback(false)}> Cancel </button>
                <button className="button button-yes" onClick={() => callback(true)}> Confirm </button>
            </div>
        </div>
    )
}

export default ConfirmDialog;