import React, { useState, useReducer, useRef } from 'react';
import moment from 'moment';
import './user-report.scss';
import Dialog from 'src/components/common/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import request from 'superagent';
import config from 'src/config';

const UserReportItem = ({report, onClick}) => {
    const {
        topic,
        reporterUsername: reporter,
        timestamp,
    } = report;

    return (
        <div className="report-item">
            <div className="topic" onClick={onClick}> {topic} </div>
            <div className="info clearfix">
                <div className="info-l"> Reported by @{reporter}</div>
                <div className="info-r"> {
                    moment(timestamp).format("MMM D, YYYY hh:mm")
                }</div>
            </div>
        </div>
    )
}

const fakeReport = {
    topic: "Turpis turpis hendrerit arcu malesuada.",
    offender: "foo_bar",
    description: "Vulputate malesuada sit tempor a. Odio scelerisqu sit aliquam, ornare sed\
     placerat enim. Pulvinar tortor id odio nunc, pulvinar quis egestas nunc, vestibulum.\
      Feugiat eu consectetur non massa at cursus ut. Malesuada nisi.",
    reporter: "Phasellus",
    timestamp: "Jan 12, 2020  20:20",
}

const ReportDialog = ({report}) => {
    const {
        topic,
        reporterUsername: reporter,
        description,
        offenderUsername: offender,
        timestamp,
    } = report;
    return (
        <div className="report-dialog">
            <div className="topic"> {topic} </div>
            <div className="offender"> Report to @{offender}</div>
            <div className="action-dropdown">
                <FontAwesomeIcon icon={faCaretDown}/>
                <div className="dropdown-menu">
                    <div className="dropdown-item"> Ban </div>
                </div>
            </div>
            <div className="description"> {description}</div>
            <div className="clearfix">
                <div className="reporter"> Reported by {reporter}</div>
                <div className="timestamp"> {moment(timestamp).format("MMM D, YYYY hh:mm")}</div>
            </div>

        </div>
    );
}

const UserReportPage = () => {
    const [isOpen, setOpen] = useState(false);
    const [reports, setReports] = useState(null);
    const [dialogReport, setDialogReport] = useState({}); // report to be shown
    const isFetch = useRef(false);
    
    const closeDialog = () => {
        setOpen(false);
    }

    if (!isFetch.current) {
        isFetch.current = true;
        request.post(config.API_URL + '/report/find')
        .withCredentials()
        .send({status: "PENDING"})
        .then(res => {
            setReports(JSON.parse(res.text));
        })
        .catch(err => {
            alert("error fetching report");
            console.error("error fetching report", err);
        })
    }



    
    return (
        
        <div className="user-report-page">
            <div className="report-list">
                {
                    reports &&
                    reports.map(report => {
                        return <UserReportItem report={report} onClick={() => {
                            setDialogReport(report);
                            setOpen(true);
                        }}/>;   
                    })
                }
            </div> 
            <Dialog isOpen={isOpen} onClose={closeDialog}>
                <ReportDialog report={dialogReport}/>
            </Dialog>
        </div>
    )
}

export default UserReportPage;