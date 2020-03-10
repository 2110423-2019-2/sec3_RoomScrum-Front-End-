import React from 'react';
import './banned-user.scss';
import Img from "react-image";
import config from 'src/config';

const UserItem = ({user}) => {
    const {
        userId,
        firstName, lastName,
        alias = "@foo_alias",
    } = user;

    return (
        <div className="banned-user-item clearfix">
            <Img className="avatar" src={[
                config.API_URL + "/user/pic" + userId,
                `https://i.pravatar.cc/80?u=${userId}`   
            ]}/>
            <div className="user-info">
                <div className="fullname"> {firstName + " " + lastName} </div>
                <div className="alias"> {alias} </div>
            </div>
        </div>
    )

}

const fakeUser = {
    userId: 1,
    firstName: "Luctus",
    lastName: "pellentesque",
    alias: "@LuctisP"
}

const BannedUsersPage = () => {
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
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                        <UserItem user={fakeUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannedUsersPage;