import React, { useRef, useState } from 'react';
import './event-invitations.scss';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';
import Dialog from 'src/components/common/dialog';
import config from 'src/config';
import request from 'superagent';
import { ApplicationStatus } from 'src/enums';
import Image from 'react-image';
import { sortByTimestampDesc } from '../util';
import AcceptInvitationButton from 'src/components/action-buttons/accept-invitation-button';
import RejectInvitationButton from 'src/components/action-buttons/reject-invitation-button';
import EmptyMessage from 'src/components/common/empty-message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EventInvitationItem = ({
  invitation: {
    // TODO: more fields
    eventId,
    event: { eventName, description },
  },
  refreshCallback,
}) => {
  return (
    <div className='event-invite-item clearfix'>
      <Image
        className='event-image'
        src={[
          config.API_URL + `/events/${eventId}/pic`,
          'https://i.pravatar.cc/120',
        ]}
      />
      <div className='event-info'>
        <div className='name'> {eventName} </div>
        <div className='bio'> {description} </div>
      </div>
      <div className='action-btns'>
        <AcceptInvitationButton eventId={eventId} onSuccess={refreshCallback} />
        <RejectInvitationButton eventId={eventId} onSuccess={refreshCallback} />
      </div>
    </div>
  );
};

const EventInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const isFetch = useRef(false);

  const fetchInvitations = () => {
    request
      .post(config.API_URL + '/application/my-application')
      .withCredentials()
      .send({ status: ['isInvited'] })
      .then((res) => {
        const invitations = res.body;
        invitations.sort(sortByTimestampDesc);
        setInvitations(invitations);
      })
      .catch((err) => {
        alert('error getting invitations ' + err.response.text);
        console.error('error getting response', err);
      });
  };

  if (!isFetch.current) {
    isFetch.current = true;
    fetchInvitations();
  }

  return (
    <div className='event-invitations'>
      <div className='title'> Event Invitations </div>
      {invitations && invitations.length > 0 ? (
        invitations.map((invitation) => (
          <EventInvitationItem
            invitation={invitation}
            refreshCallback={fetchInvitations}
          />
        ))
      ) : (
        <EmptyMessage>
          <div className='no-invitation'>
            <FontAwesomeIcon icon={faTimes} className='icon' />
            <div> No invitations </div>
            <div> When hirer invite you, it will show up here </div>
          </div>
        </EmptyMessage>
      )}
    </div>
  );
};

export default EventInvitations;
