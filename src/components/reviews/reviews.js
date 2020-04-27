import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import './reviews.scss';
import {ShowProfileButton} from 'src/components/profile'

const UserReviewItem = ({ review }) => {
    const {
        reviewer: { firstName, lastName },
        description,
    } = review;

    return (
        <div className="user-review-item">
            <ShowProfileButton user={review.reviewer}>
                <div className="reviewer"> {firstName} {lastName} </div>  
            </ShowProfileButton>       
            <div className="divider" />
            <div className="message"> {description}</div>
            
        </div>
    )
}

// user's review ()
const Reviews = ({ userId }) => {
    const [reviews, setReviews] = useState(null);
    const lastFetch = useRef(null);

    const fetchReviews = () => {
        request.get(config.API_URL + `/review/of-user/${userId}`)
            .withCredentials()
            .then(res => {
                console.log("Reviews ->", res.body);
                setReviews(res.body);
            })
            .catch(err => {
                alert("Error getting reviews", err.message);
                console.error("Error getting review", err)
            })
    }

    if (userId && lastFetch.current != userId) {
        lastFetch.current = userId;
        fetchReviews();
    }

    return (
        <div className="user-review">
            <div className="title"> user reviews </div>
            <div className="user-review-list">
                {reviews && reviews.map(review => <UserReviewItem review={review} />)}
            </div>
        </div>
    )
}

export default Reviews;