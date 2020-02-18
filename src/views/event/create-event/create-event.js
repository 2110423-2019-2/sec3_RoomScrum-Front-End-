import React, {useRef, useState, useReducer} from 'react';
import './create-event.scss';
import { Navbar, Form } from 'src/components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import request from 'superagent';
import config from 'src/config';

import { formBelow, formUpper } from './form-definition';


const CreateEventPage = () => {

    const uploadedFile = useRef();
    const formDataUpper = useRef();
    const formDataBelow = useRef();
    const [eventImage, setEventImage] = useState(null);
    
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
        for (let key in formDataUpper.current)
            data[key] = formDataUpper.current[key].value
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
                <h1> Create Event</h1>
                <div className="container-fluid" >
                    <div className="row upload-image">
                        <div className="upload-image">
                            { eventImage && <img src={eventImage}/> }

                            <input name="image" ref={uploadedFile} onChange={updateEventImage} type="file" hidden/>
                            <div className={
                                classnames({
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
                            <Form formDef={formUpper} ref={formDataUpper}/>
                        </div>
                    </div>
                    <Form formDef={formBelow} ref={formDataBelow}/>
                    
                    <button className="btn btn-primary mt-4" onClick={foo}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage;