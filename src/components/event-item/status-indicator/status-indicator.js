import React from 'react';
import {calculateEventColor, calculateEventStatus} from './event-status';
import styled from 'styled-components';
const toColor = (colorName) => {
    switch (colorName) {
        case "green":
            return "#569D66";
        case "yellow":
            return "#ECBF4D";
        case "grey":
            return "#DDDDDD";
        case "red": 
            return "#E022222";
        default:
            return colorName;
    }
}

const _IndicatorBlock = styled.div`
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background-color: ${props => toColor(props.color)};
`;

export const IndicatorBlock = ({color}) => {
    return <_IndicatorBlock color={color}/>
}

const StatusIndicator = ({color, text}) => {
    return (
        <div className="status-indicator">
            <IndicatorBlock color={color}/>
            {text}
        </div>
    );
}


export const EventStatusIndicator = ({eventStatus, applicationStatus}) => {
    return <StatusIndicator
        color={calculateEventColor(eventStatus, applicationStatus)}
        text={calculateEventStatus(eventStatus, applicationStatus)}
    />;
}

export const ContractStatusIndicator = ({contractStatus}) => {
    return <StatusIndicator color={"yellow"} text={"NOT IMPLEMENTED"}/>;
}

