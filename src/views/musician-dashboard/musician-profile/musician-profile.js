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


// musician videos (youtube)
// const MusicianVideo = ({ musician: {videoUrl} }) => {

//     const id = videoUrl.substr(videoUrl.indexOf("?v=") + 3);
    
//     return (
//         <div className="musician-video">
//             <div className="title"> Videos </div>
//             <div className="musician-video-list">
//                 <div className="yt-wrapper">
//                     <div className="yt-container">
//                         <iframe
//                             src={`https://www.youtube.com/embed/${id}`}
//                             frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                             className="yt-vid"
//                         ></iframe>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

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
            {musicianInfo && <Profile user={musicianInfo} onProfileUpdate={fetchMusicianInfo} EditProfileDialog={EditProfileDialog}/>}
            <div className="navy-bg">
                { musicianInfo && <MusicianVideo musician={musicianInfo} />}
                { <Reviews userId={userId}/>}
            </div>
        </div>
    )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState} />;

export default MusicianProfilePage;
