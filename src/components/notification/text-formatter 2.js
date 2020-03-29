import React from 'react';
import { getTextFormat } from './util';

export const TextFormatter = ({notif}) => {
    const info = getTextFormat(notif)
    return (
        <>
        {
            info.map(text => {
                switch (text.type) {
                    case "bold":
                        return <span className="bold"> {text.text}</span>
                    case "normal":
                        return <span className="normal"> {text.text}</span>
                    default:
                        return <span> unknown text</span>
                }
            })
        }
        </>
    )
}