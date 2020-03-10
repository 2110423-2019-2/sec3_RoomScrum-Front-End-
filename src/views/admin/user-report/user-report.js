import React from 'react';
import moment from 'moment';
import './user-report.scss';

const UserReportItem = ({report}) => {
    const {
        topic, timestamp, reporter
    } = report;

    return (
        <div className="report-item">
            <div className="topic"> {topic} </div>
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
    reporter: "Phasellus",
    timestamp: "Jan 12, 2020  20:20",
}

const UserReportPage = () => {
    return (
        <div className="user-report-page">
            <div className="report-list">
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
            </div>
        </div>
    )
}

export default UserReportPage;