import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import './approve-user.scss';

const UserInfo = ({field, value}) => {
    return (
        <div className="user-info">
            <span className="field-name">{field}</span> {" "}
            <span className="field-value">{value}</span>
        </div>    
    );
}

const UserItem = ({firstName, lastName, gender, age, instrument, award}) => {
    const viewMusician = () => {
        alert("view muscian");
    }

    return (
        <div className="card" style={{width: "224px"}}>
            <img src="/logo192.png" className="card-img-top p-3" alt="..."/>
            <div className="card-body p-2">
                <h5 className="card-title"> {firstName} {lastName}, {age}</h5>
                {/* <UserInfo field="A" value={age}/> */}
                {/* <UserInfo field="G" value={gender}/> */}
                <UserInfo field="I" value={instrument}/>
                <UserInfo field="AW" value={award}/>
            </div>
            <div className="card-footer p-0">
                <button className="btn btn-block" onClick={viewMusician}> view </button>
            </div>
        </div>
    );
}


const fakeUser = {
    firstName: "John",
    lastName: "Doe", 
    gender: "Male", 
    age: "25", 
    bio: "I'm professional musician foo musician foo bar musician foo bar",
    tags: [
        "Yamaha music competition 2017",
        "Trinity Grade 8",
        "foo bar",
    ],
}

export default () => {
    const match = useRouteMatch();
    const {url} = match;
    console.log(match);
    return (
        <div className="approve-musician mt-2">
            <h1> Approve Musicians </h1>
            <div className="row justify-content-around">
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
                <UserItem {...fakeUser}/>
            </div>
        </div>
    )
}