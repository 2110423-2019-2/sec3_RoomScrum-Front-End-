import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import request from 'superagent';

import config from 'src/config';

import './calendar.scss';
import { ApplicationStatus, EventStatus } from 'src/enums';
import { calculateHireeEventColor, calculateHireeEventStatus } from 'src/components/event-item/status-indicator/event-status';
import styled from 'styled-components';
import Dialog from 'src/components/common/dialog';
import ApplicationInfoDialog from '../my-applications/application-info';
import { calculateEventEmoji, calculateEventColor } from './colors';


const LegendBlock = styled.div`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    display: inline-block;
    background-color: ${props => props.color}
`

// should match calendar.scss color !
const colorMap = {
    red: "#ea9999",
    yellow: "#ffd966",
    orange: "#f6b26b",
    green: "#b6d7a8",
    blue: "#9fc5e8",
    grey: "#b7b7b7",
};


const LegendEntry = ({color, label}) => {
    return (
        <div className="legend-entry">
            <LegendBlock color={colorMap[color] || color}/>
            <span className="label event-"> {label} </span>
        </div>
    )
}

const OverlayDiv = () => {
    return <div style="color: red;"> Overlay div </div>
}

const LEGENDS = {
    "orange": "Waiting for your action",
    "yellow": "Waiting for hirer's action",
    "green": "Completed",
    "red": "Cancelled",
};


const CalendarPage = () => {

    const [events, setEvents] = useState(false);
    const [showEventDialog, setShowEventDialog] = useState(false);
    const [shownEvent, setShownEvent] = useState(null);
    const isFetch = useRef(false);

    const fetchEvents = () => {
        request.post(config.API_URL + '/application/my-application')
        .withCredentials()
        .send({status: [ApplicationStatus.IS_ACCEPTED, ApplicationStatus.IS_APPLIED]})
        .then(res => {
            // convert applications into events for calendar
            const eventDetails = res.body.map(appl => {
                const {
                    status: applicationStatus,
                    event: {
                        status: eventStatus,
                        eventName: title,
                        startdatetime: start,
                        enddatetime: end,
                    }
                } = appl;
                return {
                    title: `[${calculateEventEmoji(eventStatus, applicationStatus, "<contractStatus>")}] ${title}`,
                    start,
                    end,
                    textColor: 'black',
                    borderColor: 'transparent',
                    extendedProps: {
                        data: appl,
                    }
                }
            }) 
            setEvents(eventDetails);
        })
        .catch(err => {
            console.error("error getting applied events", err.response);
        })
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchEvents();
    }

    const closeEventDialog = () => {
        setShowEventDialog(false);
    }

    return (
        <div className="calendar-page">
            <div className="title"> Calendar </div>
            <div className="container">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={events}
                    eventRender={({el, event}) => {
                        console.log("render", {el, event});
                        el.classList.add("event-item")


                        // destructure both statuses
                        const {
                            status: applicationStatus,
                            event: {
                                status: eventStatus,
                            }
                        } = event.extendedProps.data;
                        el.classList.add("event-" + calculateEventColor(eventStatus, applicationStatus, "<contractStatus>"));
                        console.log("color is", calculateEventColor(eventStatus, applicationStatus, "<contractStatus>"));
                        console.dir(el);
                        el.onclick = () => {
                            setShowEventDialog(true);
                            setShownEvent(event.extendedProps.data);
                        }
                    }}
                />
            </div>
            <div className="legends">
                <div className="title"> Legends </div>
                {
                    Object.keys(LEGENDS).map(color => {
                        return <LegendEntry color={color} label={LEGENDS[color]}/>
                    })
                }
            </div>
            <Dialog isOpen={showEventDialog} onClose={closeEventDialog}>
                {
                    shownEvent ? (
                        <ApplicationInfoDialog 
                            application={shownEvent}
                            onClose={closeEventDialog}
                        />
                    ) : (
                        <div> null event </div>
                    )
                }
            </Dialog>
        </div>
    );
}

export default CalendarPage;