import React, { useState } from 'react';
import moment from 'moment';
import './user-report.scss';
import Dialog from 'src/components/common/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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
        reporter,
        description,
        offender,
        timestamp,
    } = report;
    return (
        <div className="report-dialog">
            <div className="topic"> {topic} </div>
            <div className="offender"> Report to @{offender}</div>
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
    const closeDialog = () => {
        setOpen(false);
    }
    
    return (
        
        <div className="user-report-page">
            <div className="report-list" onClick={() => setOpen(true)}>
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
                <UserReportItem report={fakeReport}/>
            </div> 
            <Dialog isOpen={isOpen} onClose={closeDialog}>
                <ReportDialog report={fakeReport}/>
            </Dialog>
        </div>
    )
}

export default UserReportPage;