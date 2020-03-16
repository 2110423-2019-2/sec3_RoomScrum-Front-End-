import React, { useRef, useState } from 'react';
import './band-invitations.scss';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2'
import Dialog from 'src/components/common/dialog'

const BandInvitationItem = ({band: {
    name,
    bio,
    bandId, // for getting bandImage
}, onAccept, onReject}) => {
    return (
        <div className="band-invite-item clearfix">
            <img className="band-image" src="https://i.pravatar.cc/160"/>
            <div className="band-info">
                <div className="name"> {name} </div>
                <div className="bio"> {bio} </div>
            </div>
            <div className="action-btns">
                <button className="reject" onClick={() => onReject(bandId)}> Reject </button>
                <button className="accept" onClick={() => onAccept(bandId)}> Accept </button>
            </div>
        </div>
    )
}

const fakeBand = {
    name: "Foo band",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda \
    nulla consectetur, modi cum aut optio voluptate quod fugit magnam libero \
    quasi corporis alias, recusandae tempora explicabo. Commodi veniam perferendis in.",
    bandId: 1,
}

const BandInvitations = () => {
    const [bands, setBands] = useState([]);
    const isFetch = useRef(false);
    const targetBand = useRef(null); // use Ref to prevent to many state
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);


    const fetchBands = () => {
        setBands(Array(10).fill(0).map(() => {
            return {...fakeBand};
        }))
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchBands();
    }

    const confirmAcceptBand = (bandId) => {
        targetBand.current = bandId;
        setShowAcceptDialog(true);
    }

    const confirmRejectBand = (bandId) => {
        targetBand.current = bandId;
        setShowRejectDialog(true);
    }

    const acceptBand = (confirmed) => {
        // always hide dialog
        setShowAcceptDialog(false);
        if (!confirmed) return;
        alert("Confirm " + targetBand.current + " success!")
    }

    const rejectBand = (confirmed) => {
        // always hide dialog
        setShowRejectDialog(false);
        if (!confirmed) return;
        alert("Reject " + targetBand.current + " success!")
    }
    


    return (
        <div className="band-invitations">
            {
                bands.map(band => (
                    <BandInvitationItem band={band} onAccept={confirmAcceptBand} onReject={confirmRejectBand}/>
                ))
            }
            <Dialog isOpen={showAcceptDialog} onClose={() => setShowAcceptDialog(false)}>
                <ConfirmDialog title="Accept band request" question="Do you want to join this band?" callback={acceptBand}/>
            </Dialog>
            <Dialog isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)}>
                <ConfirmDialog title="Reject band request" question="Reject and remove this invitation? you can't join unless you're invited again" callback={rejectBand}/>
            </Dialog>
        </div>
    )
}

export default BandInvitations