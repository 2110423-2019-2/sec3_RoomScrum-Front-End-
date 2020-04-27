import React, { useRef, useState } from 'react';
import Dialog from 'src/components/common/dialog';
import request from 'superagent';
import Profile from 'src/components/profile';
import config from 'src/config';

const ShowProfileButton = (
    {
        user,
        children
    }
) => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    // const user = {
    //     firstName, lastName,
    //     username,
    //     userId,
    //     birthdate,
    //     address, subdistrict, district, cityState, zipcode, country,
    //     phoneNumber,
    //     userType,

    //     //musician
    //     bio,
    //     video,

    //     //sensitive
    //     nationalId,
    //     gender,
    //     email,
    // };

    return (
        <>  
            <div onClick={()=>setShowProfileDialog(true)}>
                {children}
            </div>
            <Dialog isOpen={showProfileDialog} onClose={() => setShowProfileDialog(false)}>
                {user && <Profile 
                    user={user}  
                    isSelf={false}  />}
            </Dialog>
        </>
    );
}

export {ShowProfileButton};