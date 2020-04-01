import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';
import Image from 'react-image';
import moment from 'moment';
import './musician-profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Dialog from 'src/components/common/dialog';
import EditProfileDialog from './edit-profile-dialog';

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


// constructor for form field
const formField = (name, value) => ({name, value});

// muscian profile component
const MusicianProfile = ({
    musician: {
        firstName, lastName,
        username,
        userId,
        birthdate,
        address, subdistrict, district, cityState, zipcode, country,
        bio,
        // added field by HRH's order
        nationalId,
        gender,
        email,
        phoneNumber,
    },
    onProfileUpdate,
}) => {
    const formDef = [
        formField(
            "Birthdate", 
            moment(birthdate).format('MMM DD, YYYY') + ' ' + 
            `( ${moment(birthdate).fromNow()} years old )`
        ),
        formField("Gender", gender),
        formField("About", bio),
        formField("National ID", nationalId),
        formField(
            "Address", 
            [address, subdistrict, district, cityState, country, zipcode].join(" ")
        ),
        formField("Email", email),
        formField("Phone Number", phoneNumber),
    ];

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <div className="musician-profile">
            <div className="title"> {firstName + ' ' + lastName} </div>
            <div className="alias"> @{username} </div>
            <Image className="profile-image" src={[
                config.API_URL + `/user/profile-pic/${userId}`,
                "https://i.pravatar.cc/180",
            ]} />
            {
                formDef.map(({name, value}) => {
                    console.log({name, value});
                    return (
                        <div className="desc">
                            <div className="label"> {name}</div>
                            <div className="value"> {value}</div>
                        </div>
                    )
                })
            }      
            <button className="edit-profile-button" onClick={() => setShowEditDialog(true)}>
                <FontAwesomeIcon icon={faEdit} />
                Edit my profile
            </button>
            <Dialog isOpen={showEditDialog} onClose={() => setShowEditDialog(false)}>
                <EditProfileDialog userId={userId} onClose={() => setShowEditDialog(false)} changeCallback={onProfileUpdate}/>
            </Dialog>
        </div>
    )
};


// musician videos (youtube)
const MusicianVideo = ({ musician }) => {
    return (
        <div className="musician-video">
            <div className="title"> Videos </div>
            <div className="musician-video-list">
                <div className="yt-wrapper">
                    <div className="yt-container">
                        <iframe
                            src="https://www.youtube.com/embed/KU4qOebhkfs"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            className="yt-vid"
                        ></iframe>
                    </div>
                </div>
                <div className="yt-wrapper">
                    <div className="yt-container">
                        <iframe
                            src="https://www.youtube.com/embed/KU4qOebhkfs"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            className="yt-vid"
                        ></iframe>
                    </div>
                </div>
                <div className="yt-wrapper">
                    <div className="yt-container">
                        <iframe
                            src="https://www.youtube.com/embed/KU4qOebhkfs"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            className="yt-vid"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}


const fakeReview = {
    reviewer: {
        firstName: "John",
        lastName: "Doge",
    },
    message: "lorem ipsum asdjwqkejfeal",
    star: 5,
};


const UserReviewItem = ({review}) => {
    const {
        reviewer: {firstName, lastName},
        message,
        star,
    } = review;
    
    return (
        <div className="user-review-item">
            <div className="reviewer"> {firstName} {lastName} </div>
            <div className="divider"/>
            <div className="message"> REVIEW: {message}</div>
            <div className="rating"> {star} stars</div>
        </div>
    )
}

// user's review ()
const UserReviews = ({userId}) => {
    const [reviews, setReviews] = useState(null);
    const isFetch = useRef(false);

    const fetchReviews = () => {
        setReviews(Array(10).fill(0).map(() => {
           return {...fakeReview};
        }));
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchReviews();
    }

    return (
        <div className="user-review">
            <div className="title"> user reviews </div>
            <div className="user-review-list">
                {reviews && reviews.map(review => <UserReviewItem review={review}/>)}
            </div>
        </div>
    )
}

const _MusicianProfilePage = observer(({ loginState: { userId } }) => {
    const [musicianInfo, setMusicianInfo] = useState(null);
    const lastFetched = useRef(null);

    const fetchMusicianInfo = () => {
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

    if (userId && lastFetched.current != userId) {
        console.log("render", userId)
        lastFetched.current = userId;
        fetchMusicianInfo();
    }

    return (
        <div className="musician-profile-page">
            {musicianInfo && <MusicianProfile musician={musicianInfo} onProfileUpdate={fetchMusicianInfo}/>}
            <div className="navy-bg">
                { musicianInfo && <MusicianVideo musician={musicianInfo} />}
                { <UserReviews userId={userId}/>}
            </div>
        </div>
    )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState} />;

export default MusicianProfilePage;