import React from 'react';
import './register.scss';
//import Field from './field';
import Input from './input';
import RadioInput from './radioinput';
import AddressField from './addressfield';
import { Navbar } from 'src/components/common';
import Textarea from './textarea';

const Registration = () => {

    return (
        <div className="create-event bg-info">
            <Navbar />
            <div className="container rounded-top rounded-lg shadow">
                <h1>Registration</h1>
                {/* <div class="main">
                <table>
                    <tr>
                        <td className="picture" colspan="2" height="150px">Preview Picture Here</td>
                    </tr>
                    <Field name="profilepic" label="Upload Image: " type="file"/>
                    <Field name="username" label="Username: " type="text"/>
                    <Field name="password" label="Password: " type="password"/>
                    <Field name="cfpassword" label="Confirm Password: " type="password"/>
                    <Field name="firstname" label="Fisrt Name: " type="text"/>
                    <Field name="lastname" label="Last Name: " type="text"/>
                    <Field name="natid" label="National ID No.: " type="number"/>
                    <Field name="email" label="Email: " type="email"/>
                    <Field name="hirer" label="I am a musician" type="checkbox"/>
                    <tr>
                        <td colspan="2"><input type="checkbox"/>I am a musician</td>
                    </tr>
                    <Field name="bday" label="Birthdate: " type="date"/>
                    <Field name="tag" label="Tag: " type="tag"/>
                    <Field name="location" label="Location:" type="location"/>
                    <tr>
                        <td colspan="2"><input type="checkbox"></input>I agree 
                            <a href="termandcondition" 
                            target="popup" 
                            onclick="window.open('termandcondition.html','popup','width=600,height=600'); return false;">
                            Terms and Conditions</a>.</td>
                    </tr>
                    <tr>
                        <td class="buttonline"><button type="button" onclick="alert('Submitted')">Register</button></td>
                    </tr>
                </table>
            </div> */}
                <form>
                    <Input name="username" label="Username" type="text" />
                    <Input name="password" label="Password" type="password" />
                    <Input name="cfpassword" label="Confirm Password" type="password" />
                    <Input name="firstname" label="First Name" type="text" />
                    <Input name="lastname" label="Last Name" type="text" />
                    <Input name="natid" label="National ID No." type="number" />
                    <RadioInput name="gender" label="Gender" labels={["Male", "Female", "Others"]} />
                    <Input name="bday" label="Birthdate" type="date" />
                    <Input name="email" label="Email" type="email" />
                    <Input name="phoneno" label="Phone Number" type="number" />
                    <AddressField />
                    <RadioInput name="usertype" label="User Type" labels={["Hirer", "Musician"]} />
                    <Textarea name="bio" label="Bio" />
                    <div className="form-group row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="terms" />
                                <label className="form-check-label" for="terms">I accept <a href="terms"
                                    target="popup"
                                    onclick="window.open('./terms','popup','width=600,height=600'); return false;">Terms and Conditions </a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;