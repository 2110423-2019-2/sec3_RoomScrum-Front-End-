import React, { useRef, useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';
import Image from 'react-image';
import moment from 'moment';
import './profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Dialog from 'src/components/common/dialog';
import { UserType } from 'src/enums';
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

const ReportBtn = ({username}) => {
    return (<h1> report profile </h1>)
}
// constructor for form field
const formField = (name, value) => ({ name, value });

const Profile = ({
    user: {
        firstName, lastName,
        username,
        userId,
        birthdate,
        address, subdistrict, district, cityState, zipcode, country,
        phoneNumber,
        userType,

        //musician
        bio,
        video,

        //sensitive
        nationalId,
        gender,
        email,
    },
    onProfileUpdate,
    isSelf,
    EditProfileDialog
}) => {
    const formDef = [
        formField(
            "Birthdate",
            moment(birthdate).format('MMM DD, YYYY') + ' ' +
            `( ${moment(birthdate).fromNow()} years old )`
        ),
        formField("Gender", gender),
        // formField("About", bio),
        (userType != "Hirer" && formField("About", bio)),
        formField("National ID", nationalId),
        formField(
            "Address",
            [address, subdistrict, district, cityState, country, zipcode].join(" ")
        ),
        formField("Email", email),
        formField("Phone Number", phoneNumber),
        (userType != "Hirer" && formField("Bio", bio))
    ];

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <div className="profile">
            <div className="title"> {firstName + ' ' + lastName} </div>
            <div className="alias"> @{username} </div>
            <Image className="profile-image" src={[
                config.API_URL + `/user/profile-pic/${userId}`,
                "https://i.pravatar.cc/180",
            ]} />
            {
                formDef.map(({ name, value }) => {
                    console.log({ name, value });
                    return (
                        <div className="desc">
                            <div className="label"> {name}</div>
                            <div className="value"> {value}</div>
                        </div>
                    )
                })
            }
            {isSelf && (
                <>
                <button className="edit-profile-button" onClick={() => setShowEditDialog(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                Edit my profile
                </button>
                <Dialog isOpen={showEditDialog} onClose={() => setShowEditDialog(false)}>
                    <EditProfileDialog userId={userId} onClose={() => setShowEditDialog(false)} changeCallback={onProfileUpdate} />
                </Dialog>
                </>
            )}
            {!isSelf && (<ReportBtn/>)}
        </div>
    )
};


export default Profile