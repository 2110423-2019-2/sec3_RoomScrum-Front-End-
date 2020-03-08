import config from 'src/config';

// get image URL depending on type of invite
export const getImageURLFromNotif = (notif) => {
    switch (notif.type) {
        case 1:
            const {
                eventInviteInfo: {
                    event: {eventId},
                    // inviter: {userId},
                }
            } = notif;
            return `${config.API_URL}/events/pic/${eventId}`
        default:
            return null;
    }
}

export const getTextFormat = (notif) => {
    switch (notif.type) {
        case 1: {
            const {
                eventInviteInfo: {
                    event: {eventName},
                    inviter: {firstName},
                }
            } = notif;
            return [
                {text: firstName, type: "bold"},
                {text: "invited you to the event", type: "normal"},
                {text: eventName, type: "bold"},
            ]
        }
        default:
            return [{
                text: "unknown",
                type: "normal",
            }]
    }
}
