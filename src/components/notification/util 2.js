import config from 'src/config';

// please sync this with backend  !!!
const NotificationType = {
    EventInvitation: 1, 
    EventStateUpdate: 2, 

    BandInvitation: 11,
}


// get image URL depending on type of invite
export const getImageURLFromNotif = (notif) => {
    switch (notif.type) {
        case NotificationType.EventInvitation:{
            const {
                eventInviteInfo: {
                    event: {eventId},
                    // inviter: {userId},
                }
            } = notif;
            return `${config.API_URL}/events/pic/${eventId}`
        }
        case NotificationType.EventStateUpdate: {
            const {
                eventStateUpdateInfo: {
                    event: {eventId}
                }
            } = notif;
            return `${config.API_URL}/events/pic/${eventId}`
        }

        case NotificationType.BandInvitation:
            const {
                bandInviteInfo: {
                    inviter: {userId},
                }
            } = notif;
            return `${config.API_URL}/user/pic/${userId}`
        default:
            return null;
    }
}

const BOLD = (text) => ({text, type: "bold"});
const NORMAL = (text) => ({text, type: "normal"});

export const getTextFormat = (notif) => {
    switch (notif.type) {
        case NotificationType.EventInvitation: {
            const {
                eventInviteInfo: {
                    event: {eventName},
                    inviter: {firstName},
                }
            } = notif;
            return [ BOLD(firstName), NORMAL("invited you to perform for event"), BOLD(eventName) ]
        }
        case NotificationType.BandInvitation: {
            const {
                bandInviteInfo: {
                    inviter: {firstName},
                }
            } = notif;
            return [ BOLD(firstName), NORMAL("invited you to join their band.")]
        }
        case NotificationType.EventStateUpdate: {
            const {
                eventStateUpdateInfo: {
                    event: {eventName},
                    updateType    
                }
            } = notif;
            console.log(eventName, updateType)
            switch (updateType) {
                case "UPDATE":
                    return [NORMAL("Details for "), BOLD(eventName), NORMAL("is updated")];
                case "ACCEPT":
                    return [NORMAL("You are accepted to the event"), BOLD(eventName), NORMAL(", you can now create contract with hirer")];
                case "REJECT":
                    return [NORMAL("Sorry, you are not chosen for the event"), BOLD(eventName)];
                case "REJECT":
                    return [NORMAL("The event"), BOLD(eventName), NORMAL("has ben cancelled")];
            }
        }
        default:
            return [NORMAL("Unknown notification type"), BOLD(notif.type)]
    }
}
