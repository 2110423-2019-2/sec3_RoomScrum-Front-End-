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
        reportBy: reporter,
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

const ReportDialog = ({
        report: {
            topic,
            reportBy: reporter,
            description,
            reportTo: offender,
            timestamp,
        } 
    }) => {
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