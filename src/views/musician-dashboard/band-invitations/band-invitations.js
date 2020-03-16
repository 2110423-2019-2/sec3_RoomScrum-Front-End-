import React from 'react';
import './band-invitations.scss';

const BandInvitationItem = ({}) => {
    return (
        <div className="band-invite-item clearfix">
            <img className="band-image" src="https://i.pravatar.cc/160"/>
            <div className="band-info">
                <div className="name"> Band Name </div>
                <div className="bio"> Band bio Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi ducimus quidem consequatur voluptatum voluptas tenetur quod optio. Repellat repellendus, voluptatibus officia perferendis adipisci itaque in, sit suscipit nemo similique rem.</div>
            </div>
            <div className="action-btns">
                <button className="accept"> Accept </button>
                <button className="reject"> Reject </button>
            </div>
        </div>
    )
}

const BandInvitations = () => {
    return (
        <div className="band-invitations">
            <BandInvitationItem></BandInvitationItem>
            <BandInvitationItem></BandInvitationItem>
            <BandInvitationItem></BandInvitationItem>
            <BandInvitationItem></BandInvitationItem>
            <BandInvitationItem></BandInvitationItem>
            <BandInvitationItem></BandInvitationItem>
        </div>
    )
}

export default BandInvitations