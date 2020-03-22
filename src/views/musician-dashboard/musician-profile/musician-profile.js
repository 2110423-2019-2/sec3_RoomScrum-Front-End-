import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';

const MusicianProfile = ({musician}) => {
    return (
        <div>
            musician profile works:
            {JSON.stringify(musician)}
        </div>
    )
}

const MusicianVideo = ({musician}) => {
    return (
        <div>
            musician video works
            {JSON.stringify(musician)}
        </div>
    )
}

const _MusicianProfilePage = observer(({ loginState: {userId}}) => {
    const [musicianInfo, setMusicianInfo] = useState(null);
    const lastFetched = useRef(null);

    console.log("render", userId)
    if (userId && !lastFetched.current != userId) {
        lastFetched.current = userId;
        request.get(config.API_URL + '/user/' + userId)
        .withCredentials()
        .then(res => {
            console.log(res.body);
            setMusicianInfo(res.body);
        })
        .catch(err => {
            alert(`error getting musician #${userId} info`);
            console.error(`error getting musician #${userId} info`, err);
        })
    }

    return (
        <div>
            # {userId}
            {JSON.stringify(musicianInfo)}
            <MusicianProfile musician={musicianInfo}/>
            <MusicianVideo musician={musicianInfo}/>
        </div>
    )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState}/>;

export default MusicianProfilePage;