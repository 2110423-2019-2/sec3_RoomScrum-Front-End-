import React, { useState, useRef } from 'react';
import moment from 'moment';
import './user-report.scss';
import Dialog from 'src/components/common/dialog';
import request from 'superagent';
import config from 'src/config';
import ConfirmDialog from './confirm-dialog';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const byDateDescending = (report1, report2) => {
    const d1 = report1.timestamp;
    const d2 = report2.timestamp;
    return new Date(d2).getTime() - new Date(d1).getTime();
}


const UserReportItem = ({ report, onClick }) => {
    const {
        topic,
        reportBy: reporter,
        timestamp,
        status,
    } = report;

    return (
        <div className="report-item">
            <div className="topic" onClick={onClick}> 
                <FontAwesomeIcon className="icon" icon={status == 'UNREAD' ? faEnvelope : faEnvelopeOpen}/>
                {topic}
            </div>
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

    const banUser = (confirm) => {
        setShow(false);
        if (confirm) {
            request.post(config.API_URL + '/admin/user/ban')
                .send({ username: offender, banDuration: 7 })
                .then(res => {
                    alert("Banned User");
                })
                .catch(err => {
                    alert("Error banning user");
                    console.error("error banning user", err);
                })
        }

    }
    const [show, setShow] = useState(false);
    console.dir({ topic, reporter, description, offender, timestamp })

    return (
        <div className="report-dialog">
            <div className="topic"> {topic} </div>
            <div>
                <span className="offender"> Report to @{offender}</span>
                <span className="ban-button" onClick={() => setShow(true)}> Ban </span>
            </div>
            <div className="description"> {description}</div>
            <div className="clearfix">
                <div className="reporter"> Reported by {reporter}</div>
                <div className="timestamp"> {moment(timestamp).format("MMM D, YYYY hh:mm")}</div>
            </div>
            <Dialog isOpen={show} onClose={() => setShow(false)}>
                <ConfirmDialog
                    callback={banUser}
                    question={`Are you sure you want to ban @${offender}\
                    ? this cannot be undone!`}
                    title="Ban user"
                />
            </Dialog>
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

    const fetchReports = () => {
        request.post(config.API_URL + '/report/find')
        .withCredentials()
        .send()
        .then(res => {
            const reports = JSON.parse(res.text);
            reports.sort(byDateDescending);
            console.log("report =>", reports);
            setReports(reports);
        })
        .catch(err => {
            alert("error fetching report");
            console.error("error fetching report", err);
        })
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchReports();
    }


    const markAsRead = (id) => {
        request.post(config.API_URL + '/report/' + id)
        .withCredentials()
        .send({id, newStatus: "READ"})
        .then(() => {
            // workaround !
            setReports(
                reports.map(r => {
                    if (r.reportId != id) return r;
                    return {...r, status: "READ"};
                }).sort(byDateDescending)
            );
        })
        .catch(err => {
            alert("mark as read error");
            console.error("mark as read error", err)
        })
    }

    return (

        <div className="user-report-page">
            <div className="report-list">
                {
                    reports &&
                    reports.map(report => {
                        return <UserReportItem key={report.reportId} report={report} onClick={() => {
                            setDialogReport(report);
                            setOpen(true);
                            markAsRead(report.reportId);
                            console.log("mark as read report", report.reportId);
                        }} />;
                    })
                }
            </div>
            <Dialog isOpen={isOpen} onClose={closeDialog}>
                <ReportDialog report={dialogReport} />
            </Dialog>
        </div>
    )
}

export default UserReportPage;