import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const NavIcon = ({icon, children, id}) => {

    const [show, setShow] = useState(false);

    return (
        <div className="nav-icon">
            <div className="icon" onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="nav-dropdown" id={id}>
                {show && children}
            </div>
        </div>
    )
}

export default NavIcon