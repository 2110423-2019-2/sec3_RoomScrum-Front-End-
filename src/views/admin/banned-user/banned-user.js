import React, { useState, useRef } from 'react';
import './banned-user.scss';
import Img from "react-image";
import config from 'src/config';
import request from 'superagent';

const UserItem = ({
    user: {
        userId,
        username,
        firstName, lastName
    }
}) => {
    return (
        <div className="banned-user-item clearfix">
            <Img className="avatar" src={[
                config.API_URL + "/user/pic" + userId,
                `https://i.pravatar.cc/80?u=${userId}`   
            ]}
                loader={
                    <div className="avatar placeholder"/>
                }
            />
            <div className="user-info">
                <div className="fullname"> {firstName + " " + lastName} </div>
                <div className="alias"> @{username} </div>
            </div>
        </div>
    )

}

const BannedUsersPage = () => {
    const [bannedUsers, setBannedUsers] = useState(null);
    const isFetch = useRef(false);

    if (!isFetch.current) {
        isFetch.current = true;
        request.get(config.API_URL + '/admin/user/banlist')
        .withCredentials()
        .then(res => {
            const users = JSON.parse(res.text);
            console.dir("banned users", users);
            setBannedUsers(users);
        })
        .catch(err => {
            alert("error fethcing banned users");
            console.error("error fetching banned users", err);
        })
    }
    
    return (
        <div className="banned-user-page">
            <div className="container p-0">
                <div className="centered header">
                    <div className="label"> Enter username to ban</div>
                    <input className="form-control"></input>
                </div>
                <div className="centered">
                    <div className="label"> Banned users </div>
                    <div className="user-list">
                        {
                            bannedUsers &&
                            bannedUsers.map(user => (
                                <UserItem user={user}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannedUsersPage;