import React, {useRef, useState, useReducer} from 'react';
import './create-event.scss';
import { Navbar } from 'src/components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTired, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import classname from 'classname';
import request from 'superagent';
import config from 'src/config';

import formDefinition from './form-definition';
import { formStateBuilder } from './form';



const CreateEventPage = () => {

    const uploadedFile = useRef();
    const [eventImage, setEventImage] = useState(null);
    const [form, dispatch] = formStateBuilder(formDefinition)();
    
    const clickUpload = () => {
        uploadedFile.current.click();
    }
    
    const updateEventImage = () => {
        const upload = uploadedFile.current;
        if (upload.files && upload.files[0]) {
            var reader = new FileReader();
            
            reader.onload = e => {
                setEventImage(e.target.result)
            }       
            reader.readAsDataURL(upload.files[0]);
        }
    }

    const uploadImage = async () => {
        const form = new FormData();
        const upload = uploadedFile.current;
        if (!upload.files || !upload.files[0])
            throw new Error("No file uploaded");
        form.append('image', uploadedFile.current.files[0]);
        request.post(`${config.API_URL}/upload-image`)
            .send(form)
    }
    const postData = async () => {
        const data = {}
        for (let key in form) {
            data[key] = form[key].value;
        }
        await request.post(`${config.API_URL}/event/`)
            .send(data)
        console.log('create event ok');
    }

    const foo = async () => {
        await postData();
        // TODO use postData to determine which user image to upload
        await uploadImage();
    }
    return (
        <div className="create-event bg-info">
            <Navbar/>
            <div className="container rounded-top rounded-lg shadow">
                <h1> Create Event </h1>
                <div className="container-fluid" >
                    <div className="row upload-image">
                        <div className="upload-image">
                            { eventImage && <img src={eventImage}/> }

                            <input name="image" ref={uploadedFile} onChange={updateEventImage} type="file" hidden/>
                            <div className={
                                classname({
                                    overlay: true,
                                    'force-show': !eventImage,
                                })
                            } onClick={clickUpload}> 
                                <div>
                                    <FontAwesomeIcon icon={faArrowCircleUp}/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input">
                                <label> Event Name </label>
                                <input className="form-control" name="text"/>
                            </div>
                            <div className="input">
                                <label> Date </label>
                                <input className="form-control" name="date"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {
                            Object.keys(formDefinition)
                                .map(key => {
                                    const {type = "text", label = "UNKNOWN LABEL", width = "12"} = formDefinition[key];
                                    const {value, errors} = form[key];
                                    return (
                                        <div className={"input col-" + width}>
                                            <label> {label} </label>
                                            {
                                                type === "textarea" ?
                                                <textarea className="form-control" rows="4"/>
                                                :
                                                <input type={type} value={value} className={
                                                    classname({
                                                        "form-control": true,
                                                        "is-valid": errors && errors.length == 0,
                                                        "is-invalid": errors && errors.length != 0,
                                                    })
                                                }
                                                    onChange={
                                                        ({target: {value}}) => {
                                                            dispatch({
                                                                type: 'UPDATE',
                                                                payload: {
                                                                    field: key,
                                                                    value,
                                                                }
                                                            })
                                                            dispatch({
                                                                type: 'CHECK',
                                                                payload: {
                                                                    field: key,
                                                                    value,
                                                                }
                                                            })
                                                        }
                                                    }
                                                />
                                            }
                                            <div className="error-container">
                                                {
                                                    errors && errors.map((err) => {
                                                        return (
                                                            <div className="text-danger">
                                                                {err}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>    
                                            
                                        </div>
                                    )
                                })
                            }
                    </div>
                    <button className="btn btn-primary" onClick={foo}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage;