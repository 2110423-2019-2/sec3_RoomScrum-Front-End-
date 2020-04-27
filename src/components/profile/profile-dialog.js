import React, { useRef, useState } from 'react';
import Dialog from 'src/components/common/dialog';
import request from 'superagent';

const ProfileDialog = ({
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
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    return (
    <div className="profile-dialog">
        <Dialog isOpen={showProfileDialog}>

        </Dialog>
    </div>
    )
};

export {ProfileDialog};