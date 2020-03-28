import { ApplicationStatus, EventStatus } from 'src/enums';

export const calculatePaymentStatus = (eventStatus) => {
    switch (eventStatus) {
        case EventStatus.PAYMENT_PENDING:
            return "Pending";
        case EventStatus.SETTLE:
        case EventStatus.COMPLETE:
            return "Paid";
        default:
            return "N/A";
    }
}
export const calculatePaymentColor = (eventStatus) => {
    switch (eventStatus) {
        case EventStatus.PAYMENT_PENDING:
            return "yellow";
        case EventStatus.SETTLE:
        case EventStatus.COMPLETE:
            return "green";
        default:
            return "grey";
    }
}