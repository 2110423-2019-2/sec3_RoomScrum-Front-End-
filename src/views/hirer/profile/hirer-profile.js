import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';
import './hirer-profile.scss';
import Profile from 'src/components/profile';
import Reviews from 'src/components/reviews'

import EditProfile from "./edit-profile"

const _MusicianProfilePage = observer(({ loginState: { userId } }) => {
  const [musicianInfo, setMusicianInfo] = useState(null);
  const lastFetched = useRef(null);

  const fetchMusicianInfo = () => {
    request.get(config.API_URL + '/user/' + userId)
      .withCredentials()
      .then(res => {
        setMusicianInfo(res.body);
      })
      .catch(err => {
        alert(`error getting musician #${userId} info`);
        console.error(`error getting musician #${userId} info`, err);
      })
  }

  if (userId && lastFetched.current != userId) {
    console.log("render", userId)
    lastFetched.current = userId;
    fetchMusicianInfo();
  }

  return (
    <div className="musician-profile-page">
      {musicianInfo && <Profile user={musicianInfo} onProfileUpdate={fetchMusicianInfo} isSelf={true} EditProfileDialog={EditProfile} />}
      <div className="navy-bg">
        {<Reviews userId={userId} />}
      </div>
    </div>
  )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState} />;

export default MusicianProfilePage;
