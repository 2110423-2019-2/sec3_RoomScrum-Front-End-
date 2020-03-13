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

// muscian profile component
const MusicianProfile = ({
    musician: {
        firstName, lastName,
        username,
        userId,
        birthdate,
        address, subdistrict, district, cityState, zipcode, country,
        bio
    }
}) => {
    return (
        <div className="musician-profile">
            <div className="title"> {firstName + ' ' + lastName} </div>
            <div className="alias"> @{username} </div>
            <Image className="profile-image" src={[
                config.API_URL + `/user/profile-pic/${userId}`,
                "https://i.pravatar.cc/180",
            ]} />
            <div className="desc">
                <div className="label"> Birthdate </div>
                <div className="value">
                    {moment(birthdate).format('MMM DD, YYYY')} {" "}
                    ( {moment(birthdate).fromNow()} years old )  </div>
            </div>
            <div className="desc">
                <div className="label"> Location </div>
                <div className="value">
                    {address}, {subdistrict}, {district}, {cityState}, {zipcode}, {country}
                </div>
            </div>
            <div className="desc">
                <div className="label"> About </div>
                <div className="value">
                    {bio}
                </div>
            </div>
            <button className="edit-profile-button">
                <FontAwesomeIcon icon={faEdit} />
                Edit my profile
            </button>
        </div>
    )
}

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
        <div className="musician-profile-page">
            {musicianInfo && <MusicianProfile musician={musicianInfo} />}
            <div className="navy-bg">
                { musicianInfo && <MusicianVideo musician={musicianInfo} />}
                { <UserReviews userId={userId}/>}
            </div>
        </div>
    )
});

const MusicianProfilePage = () => <_MusicianProfilePage loginState={globalLoginState} />;

export default MusicianProfilePage;