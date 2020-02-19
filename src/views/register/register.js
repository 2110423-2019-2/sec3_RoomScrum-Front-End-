import React, { useRef, useState } from 'react';
import './register.scss';
//import Field from './field';
import Input from './input';
import RadioInput from './radioinput';
import AddressField from './addressfield';
import { Navbar } from 'src/components/common';
import Textarea from './textarea';
import request from 'superagent';
import config from 'src/config';
const Registration = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const cfpasswordRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const natidRef = useRef();
    const genderRef = useRef();
    const bdayRef = useRef();
    const emailRef = useRef();
    const phonenoRef = useRef();
    const usertypeRef = useRef();
    const bioRef = useRef();
    const formdata ={
        username : usernameRef.current,
        password : passwordRef.current,
        cfpassword : cfpasswordRef.current,
        firstname : firstnameRef.current,
        lastname : lastnameRef.current,
        natid : natidRef.current,
        gender : genderRef.current,
        bday : bdayRef.current,
        email : emailRef.current,
        phoneno : phonenoRef.current,
        usertype : usertypeRef.current,
        bio : bioRef.current,
    }
    console.log(formdata);
    const onSubmit = () => {
        console.log(usernameRef.current);
        console.log(passwordRef.current);
        console.log(cfpasswordRef.current);
        console.log(firstnameRef.current);
        console.log(lastnameRef.current);
        console.log(natidRef.current);
        console.log(genderRef.current);
        console.log(bdayRef.current);
        console.log(emailRef.current);
        console.log(phonenoRef.current);
        console.log(usertypeRef.current);
        console.log(bioRef.current);
        request.post(`${config.API_URL}/user/register`)
        .send(formdata )
        .then(res => {console.log(res.text)})
        .catch(err => {
        alert('Please correct all space')
        });
    }

    const [accepted, setAccepted] = useState(false);
    const handleChange = (evt) => { 
        setAccepted(evt.target.checked);
        console.log("accepted?", evt.target.checked);
    }
     
    return (
        <div className="create-event bg-info">
            <Navbar />
            <div className="container rounded-top rounded-lg shadow">
                <h1>Registration</h1>
                <div>
                    <Input ref={usernameRef} name="username" label="Username" type="text"/>
                    <Input ref={passwordRef} name="password" label="Password" type="password" />
                    <Input ref={cfpasswordRef} name="cfpassword" label="Confirm Password" type="password"/>
                    <Input ref={firstnameRef} name="firstname" label="First Name" type="text" />
                    <Input ref={lastnameRef} name="lastname" label="Last Name" type="text" />
                    <Input ref={natidRef} name="natid" label="National ID No." type="number" />
                    <RadioInput ref={genderRef} name="gender" label="Gender" labels={["Male", "Female", "Others"]} />
                    <Input ref={bdayRef} name="bday" label="Birthdate" type="date" />
                    <Input ref={emailRef} name="email" label="Email" type="email" />
                    <Input ref={phonenoRef} name="phoneno" label="Phone Number" type="number" />
                    <AddressField />
                    <RadioInput ref={usertypeRef} name="usertype" label="User Type" labels={["Hirer", "Musician"]} />
                    <Textarea ref={bioRef} name="bio" label="Bio" />
                    <div className="form-group row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="terms" checked={accepted}
                                    onChange={handleChange} />
                                <label className="form-check-label" for="terms">I accept <a href="terms"
                                    target="popup"
                                    onclick="window.open('./terms','popup','width=600,height=600'); return false;">Terms and Conditions </a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button onClick={onSubmit} className="btn btn-primary" disabled={!accepted}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;