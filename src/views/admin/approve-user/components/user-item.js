import React from 'react';
import './user-item.scss';

const UserInfo = ({field, value}) => {
    return (
        <div className="user-info">
            <span className="field-name">{field}</span> {" "}
            <span className="field-value m-0">{value}</span>
        </div>    
    );
};

const UserItem = ({onViewMusician, userInfo}) => {
    const {firstName, lastName, gender, age, bio, tags, imageProfile} = userInfo;

    return (
        <div className="user-item card" style={{width: "224px"}}>
            <img src={imageProfile} className="card-img-top p-3" alt="..."/>
            <div className="card-body p-2">
                <h5 className="card-title"> {firstName} {lastName}, {age}</h5>
                <UserInfo field="Gender" value={gender}/>
                <UserInfo field="" value={bio}/>
                <div>
                    {
                        tags.map(tag => (
                            <span className="badge badge-secondary mr-2"> {tag} </span>
                        ))
                    }
                </div>
            </div>
            <div className="card-footer p-0 bg-white">
                <button className="btn btn-block" onClick={onViewMusician}> View </button>
            </div>
        </div>
    );
};

export default UserItem;