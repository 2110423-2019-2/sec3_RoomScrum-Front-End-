import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';
import moment from 'moment';
import './musician-profile.scss';
import EditProfileDialog from './edit-profile-dialog';
import Profile from 'src/components/profile';
import Reviews from 'src/components/reviews'
import MusicianVideo from 'src/components/musician-video'


moment.locale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: "now",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1m",
        MM: "%dm",
        y: "1y",
        yy: "%d"
    }
});

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
            {musicianInfo && <Profile user={musicianInfo} onProfileUpdate={fetchMusicianInfo} isSelf={true} EditProfileDialog={EditProfileDialog}/>}
            <div className="navy-bg">
                { musicianInfo && <MusicianVideo musician={musicianInfo} />}
                { <Reviews userId={userId}/>}
            </div>
        </div>
    )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState} />;

export default MusicianProfilePage;
