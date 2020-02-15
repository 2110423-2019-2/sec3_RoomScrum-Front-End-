import React from 'react';
import './user-item.scss';

const UserInfo = ({field, value}) => {
    return (
        <div className="user-info mb-1">
            <span className="field-name">{field}</span> {" "}
            <span className="field-value m-0">{value}</span>
        </div>    
    );
};

const calcAge = (date1, date2) => {
    return Math.floor((date1 - date2)/ 24/3600/365.25/1000); 
}

const UserItem = ({onViewMusician, userInfo}) => {
    const {firstName, lastName, gender, birthdate, bio, tags, imageProfile} = userInfo;
    const age = calcAge(new Date(), new Date(birthdate));
    return (
        <div className="user-item card">
            <div className="text-center">
                <img src={imageProfile} className="card-img-top rounded-circle p-3 d-inline-block" alt="..."/>
            </div>
            <div className="card-body bg-gray">
                <div className="h4 m-0"> {firstName}</div>
                <div className="h5"> {lastName}</div>
                <UserInfo field="Gender" value={gender}/>
                <UserInfo field="Age" value={age}/>
                <div>
                    {
                        tags.map(tag => (
                            <span className="badge badge-secondary mr-2"> {tag} </span>
                        ))
                    }
                </div>
                <UserInfo field="" value={bio}/>
            </div>
            <div className="card-footer p-0 mt-1 bg-white">
                <button className="btn btn-block" onClick={onViewMusician}> View </button>
            </div>
        </div>
    );
};

export default UserItem;