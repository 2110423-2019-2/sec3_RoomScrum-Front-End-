import React, { useRef, useState } from 'react';
import './register.scss';
import { Navbar, Form } from 'src/components/common';
import request from 'superagent';
import config from 'src/config';
import { regsiterFormDef } from "./form-definition";

const Registration = () => {
     
    const formDataRef = useRef();
    
    const submit = () => {
        
    }

    return (
        <div className="create-event bg-info">
            <Navbar />
            <div className="container rounded-top rounded-lg shadow">
                <h1>Registration</h1>
                <Form formDef={regsiterFormDef} ref={formDataRef}/>
                <button onClick={submit}> Register </button>
            </div>
        </div>
    )
}

export default Registration;