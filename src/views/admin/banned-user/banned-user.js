import React, { useState, useRef } from 'react';
import './banned-user.scss';
import Img from "react-image";
import config from 'src/config';
import request from 'superagent';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from '../user-report/confirm-dialog';

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
    
    const [userChoice, setUserChoice] = useState([]);
    const [isLoading, setLoading] = useState(false);
    
    const [openBanDialog, setOpenBanDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const fetchBannedUsers = () => {
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

    if (!isFetch.current) {
        isFetch.current = true;
        fetchBannedUsers();
    }

    
    const fetchChoice = (query) => {
        setLoading(true);
        request.post(config.API_URL + '/user/find-by-username')
        .withCredentials()
        .send({username: query})
        .then(res => {
            const users = JSON.parse(res.text);
            setUserChoice(users);
            setLoading(false);
        })
        .catch(err => {
            console.error("error fetching user selection", err)
        });
    }

    const handleSelection = (selection) => {
        if (!selection || selection.length == 0) return;
        const [{username}] = selection;
        setSelectedUser(username);
        setOpenBanDialog(true);
    }

    const handleBan = (confirm) => {
        setOpenBanDialog(false);
        if (!confirm) return;
        if (selectedUser) {
            request.post(config.API_URL + '/admin/user/ban')
            .send({username: selectedUser, banDuration: 7})
            .then(res => {
                setOpenBanDialog(false);
                fetchBannedUsers();
                alert("Ban user success");
            })
            .catch(err => {
                alert("Ban user error");
                console.error("ban user error", err);
            });
        }
    }
    
    return (
        <div className="banned-user-page">
            <Dialog isOpen={openBanDialog} onClose={() => setOpenBanDialog(false)}>
                <ConfirmDialog
                    callback={handleBan}
                    question={`Are you sure you want to ban @${selectedUser}\
                    ? this cannot be undone!`}
                    title="Ban user"
                />
            </Dialog>
            <div className="container p-0">
                <div className="centered header">
                    <div className="label"> Enter username to ban</div>
                    <AsyncTypeahead
                        options={userChoice}
                        isLoading={isLoading}
                        id="async-example"
                        labelKey="username"
                        multiple={false}
                        minLength={3}
                        onSearch={fetchChoice}
                        placeholder="Search for a Github user..."
                        onChange={handleSelection}
                        renderMenuItemChildren={(option, props) => {
                            const {firstName, lastName, username} = option;
                            return <div> {`${firstName} ${lastName} (@${username})`}</div>;
                        }}
                    />
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