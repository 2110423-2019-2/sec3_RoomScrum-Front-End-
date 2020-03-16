import React from 'react';
import './band-invitations.scss';


const BandInvitationItem = () => {
    return (
        <div className="band-invite-item">
            <img className="band-image" src="/logo192.png"/>
            <div className="band-info">
                <div className="name"> Band Name </div>
                <div className="band-bio"> Band bio Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi ducimus quidem consequatur voluptatum voluptas tenetur quod optio. Repellat repellendus, voluptatibus officia perferendis adipisci itaque in, sit suscipit nemo similique rem.</div>
            </div>
            <div className="action-btns">
                <button> Accept </button>
                <button> Reject </button>
            </div>
        </div>
    )
}

const BandInvitations = () => {
    return (
        <div>
            <BandInvitationItem></BandInvitationItem>
        </div>
    )
}

export default BandInvitations