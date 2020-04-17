import { EventStatus, ApplicationStatus, ContractStatus } from "src/enums"

// massive if else 
export const calculateEventColor = (eventStatus, applicationStatus, contractStatus) => {
    if (eventStatus == EventStatus.CANCELLED || applicationStatus == ApplicationStatus.APPLICATION_REJECTED || 
        contractStatus == ContractStatus.CANCELLED) {
        return "red";
    }

    console.log("Application", eventStatus, applicationStatus)

    switch (eventStatus) {
        case EventStatus.HAVE_APPLICANT:
            switch (applicationStatus) {
                case ApplicationStatus.IS_INVITED: return "orange";
                case ApplicationStatus.IS_APPLIED: return "yellow";
                case ApplicationStatus.APPLICATION_REJECTED: return "red";
                default: return "grey";
            }
        case EventStatus.CONTRACT_DRAFTING:
            switch (contractStatus) {
                case ContractStatus.REJECTED:
                case ContractStatus.DRAFTING:
                    return "orange";
                case ContractStatus.REVIEW_PENDING:
                    return "yellow";
                default: return "grey";
            }
        case EventStatus.PAYMENT_PENDING:
            return "yellow";
        case EventStatus.SETTLE:
            return "green";
        case EventStatus.COMPLETE:
            return "green";
        default:
            return "grey"
    }   
}

export const calculateEventEmoji =  (eventStatus, applicationStatus, contractStatus) => {
    switch (eventStatus) {
        case EventStatus.HAVE_APPLICANT:
            if (applicationStatus == ApplicationStatus.APPLICATION_REJECTED)
                return "📄❎";
            return "📄";
        case EventStatus.CONTRACT_DRAFTING:
            if (contractStatus == ContractStatus.CANCELLED)
                return "✏️❎";
            return "✏️";
        case EventStatus.PAYMENT_PENDING:
            return "💰";
        case EventStatus.SETTLE:
            return "🎸";
        case EventStatus.COMPLETE:
            return "☑️";
        default:
            return "❎"
    }
}