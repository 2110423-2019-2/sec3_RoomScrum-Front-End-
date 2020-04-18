import React from 'react';
import './empty-message.scss';

const EmptyMessage = ({children}) => {
    return (
        <div className="empty-message">
            {children}
        </div>
    )
}

export default EmptyMessage;