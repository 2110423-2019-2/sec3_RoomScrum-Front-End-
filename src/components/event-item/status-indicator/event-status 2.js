import { ApplicationStatus, EventStatus } from 'src/enums';

export const calculateEventStatus = (eventStatus, applicationStatus) => {
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
export const calculateEventColor = (eventStatus, applicationStatus) => {
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