import config from 'src/config';

// please sync this with backend  !!!
const NotificationType = {
    ApplicationAccepted: 'ApplicationAccepted',
    ContractSent: 'ContractSent',
    ContractCancelledByHirer: 'ContractCancelledByHirer',
    ContractCancelledByMusician: 'ContractCancelledByMusician',
    ContractAccepted: 'ContractAccepted',
    ContractRejected: 'ContractRejected',
    EventCancelled: 'EventCancelled',
    EventCompleted: 'EventCompleted',
    MusicianApplied: 'MusicianApplied',
    NewReview: 'NewReview',
    InvitationReceived: 'InvitationReceived',
    ApplicationRejected: 'ApplicationRejected',
}


// get image URL depending on type of invite
export const getImageURLFromNotif = (notif) => {
    // these are notification which show avatar
    const { NewReview, MusicianApplied } = NotificationType; 
    switch (notif.type) {
        case NewReview:
        case MusicianApplied:
            return `${config.API_URL}/user/profile-pic/${notif.senderId}`;
        default:
            return `${config.API_URL}/events/${notif.eventId}/pic`;
    }
}

const B = (text) => ({text, type: "bold"});
const N = (text) => ({text, type: "normal"});

export const getTextFormat = (notif) => {
    const {event, sender, receiver} = notif;
    const {eventName} = event || {eventName: "fo"};
    const senderName = sender.firstName + ' ' + sender.lastName[0] + '.'; // FirstName L.

    switch (notif.type) {
        case NotificationType.ApplicationAccepted: 
            return [
                N("Your application on"), B(eventName), N("has been accepted"),
            ];
        case NotificationType.ContractSent: 
            return [
                B(senderName), N("sent you a contract for event"), N(eventName),
            ];
        case NotificationType.ContractCancelledByHirer: 
            return [
                N("Your contract on"), B(eventName) , N("has been cancelled"),
            ];
        case NotificationType.ContractCancelledByMusician: 
            return [
                N("The contract on"), B(eventName) , N("has been cancelled"),
            ];
        case NotificationType.ContractAccepted: 
            return [
                N("Hirer accepted your contract on"), B(eventName),
            ];
        case NotificationType.ContractRejected: 
            return [
                N("Hirer rejected your contract on"), B(eventName),
            ]
        case NotificationType.EventCancelled: 
            return [
                N("The event"), B(eventName), N("you applied have been cancelled"),
            ]
        case NotificationType.EventCompleted: 
            return [
                N("Event"), B(eventName) , N("is complete, Please give it a review"),
            ]
        case NotificationType.MusicianApplied: 
            return [
                B(senderName), N("just applied for your event"), B(eventName),
            ]
        case NotificationType.NewReview: 
            return [
                N("You have been reviewed by"), B(senderName), N("on"), B(eventName),
            ]
        case NotificationType.InvitationReceived: 
            return [
                N("You have been invited to"), B(eventName),
            ]
        case NotificationType.ApplicationRejected: 
            return [
                N("Your application for"), B(eventName), N("has been rejected")
            ]
        default:
            return [N("Unknown Notif type"), B(notif.type)]
    }
}
