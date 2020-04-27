import { ApplicationStatus, EventStatus } from 'src/enums';

export const calculateHireeEventStatus = (eventStatus, applicationStatus) => {
    if (eventStatus == EventStatus.CANCELLED) return "Cancelled";
    switch (applicationStatus) {
        case ApplicationStatus.IS_INVITED:
            return "Invited";
        case ApplicationStatus.IS_APPLIED:
            return "Pending";
        case ApplicationStatus.IS_ACCEPTED:
            return "Accepted";
        case ApplicationStatus.APPLICATION_REJECTED:
            return "Rejected";
    }
}
export const calculateHireeEventColor = (eventStatus, applicationStatus) => {
    if (eventStatus == EventStatus.CANCELLED) return "red";
    switch (applicationStatus) {
        // 3 status พวกนี้รู้แน่ชัดว่าควรแสดงว่าไร
        case ApplicationStatus.IS_INVITED:
            return "grey";
        case ApplicationStatus.IS_APPLIED:
            return "yellow";
        case ApplicationStatus.IS_ACCEPTED:
            return "green";
        case ApplicationStatus.APPLICATION_REJECTED:
            return "red";
    }
}

export const calculateHirerEventStatus = (eventStatus) => {
    switch (eventStatus) {
        case EventStatus.CREATED:
            return "Created";
        case EventStatus.HAVE_APPLICANT:
            return "Have hiree(s)";
        case EventStatus.CONTRACT_DRAFTING:
            return "In Contract Process";
        case EventStatus.PAYMENT_PENDING:
            return "Payment Pending";
        case EventStatus.SETTLE:
            return "Settle";
        case EventStatus.COMPLETE:
            return "Complete";
        case EventStatus.CANCELLED:
            return "Cancelled";
    }
}
export const calculateHirerEventColor = (eventStatus) => {
    switch (eventStatus) {
        case EventStatus.CREATED:
            return "aqua";
        case EventStatus.HAVE_APPLICANT:
            return "blue";
        case EventStatus.CONTRACT_DRAFTING:
            return "yellow";
        case EventStatus.PAYMENT_PENDING:
            return "orange";
        case EventStatus.SETTLE:
            return "red";
        case EventStatus.COMPLETE:
            return "green";
        case EventStatus.CANCELLED:
            return "grey";
    }
}