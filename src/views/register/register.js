import React, { useRef, useState } from 'react';
import './register.scss';
import { Navbar, Form } from 'src/components/common';
import request from 'superagent';
import config from 'src/config';
import { userFormDef, musicianFormDef } from "./form-definition";
import FormV2 from 'src/components/common/form/form-v2';
import { formStateBuilder } from 'src/components/common/form/form-state';

const Registration = () => {
     
    const [userForm, dispatchUserForm] = formStateBuilder(userFormDef)();
    const [musicianForm, dispatchMusicianForm] = formStateBuilder(musicianFormDef)();
    
    const submit = () => {
        const sendData = {}
        for (let key in userForm)
            sendData[key] = userForm[key].value
        
        for (let key in musicianForm)
            sendData[key] = musicianForm[key].value


        // hack
        sendData.gender = +userForm.gender.value

        request.post(`${config.API_URL}/user/create`)
            .send(sendData)
            .then(res => {
                console.log(res.text);
                alert("Register success");
            })
            .catch(err => {
                console.error(err);
                alert(JSON.stringify(err))
            })
    }
    
    return (
        <div className="register bg-info">
            <Navbar />
            <div className="container rounded-top rounded-lg shadow">
                <h1>Registration</h1>
                <FormV2 formData={userForm} dispatch={dispatchUserForm} formDef={userFormDef}/>
                {
                    userForm['userType'].value == 'M' && // show only for musician
                    <FormV2 formData={musicianForm} dispatch={dispatchMusicianForm} formDef={musicianFormDef}/>
                }
                <button className="btn btn-primary mt-4" onClick={submit}> Register </button>
            </div>
        </div>
    )
}

export default Registration;