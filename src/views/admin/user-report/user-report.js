import React, { useState, useRef } from 'react';
import moment from 'moment';
import './user-report.scss';
import Dialog from 'src/components/common/dialog';
import request from 'superagent';
import config from 'src/config';
import ConfirmDialog from './confirm-dialog';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const UserReportItem = ({ report, onClick }) => {
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

    if (!isFetch.current) {
        isFetch.current = true;
        request.post(config.API_URL + '/report/find')
            .withCredentials()
            .send({ status: "PENDING" })
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