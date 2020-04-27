import React, { useRef, useState } from 'react';
import Dialog from 'src/components/common/dialog';
import request from 'superagent';
import Profile from 'src/components/profile';
import config from 'src/config';
import './show-profile-button.scss';
import Reivews from 'src/components/reviews'

var cx = require('classnames');

const ShowProfileButton = (
    {
        user,
        children
    }
) => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    return (
        <>  
            {React.cloneElement(children, { onClick: () => setShowProfileDialog(true) , className:cx(children.props.className, 'show-profile-children')} ) }
                <Dialog isOpen={showProfileDialog} onClose={() => setShowProfileDialog(false)}>
                    <div className="show-profile-dialog">
                            <div className='item profile'>
                                {user && <Profile 
                                    user={user}  
                                    isSelf={false}  />}   
                            </div>
                            <div className='item reviews'>
                                {user && <Reivews userId={user.userId} className='reviews'/>}
                            </div>
                    </div>
                </Dialog>
                <></>
        </>
    );
}

export {ShowProfileButton};