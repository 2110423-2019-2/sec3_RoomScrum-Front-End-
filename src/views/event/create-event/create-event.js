import React, {useRef, useState} from 'react';
import './create-event.scss';
import { Navbar } from 'src/components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTired, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import classname from 'classname';

import request from 'superagent';
import config from 'src/config';



const CreateEventPage = () => {

    const uploadBtn = useRef();
    const form = useRef();
    const [eventImage, setEventImage] = useState(null);
    // const [form, setForm] = useState({});

    const clickUpload = () => {
        console.log("click")
        uploadBtn.current.click();
    }
    
    const handleFileUpload = () => {
        const upload = uploadBtn.current;
        if (upload.files && upload.files[0]) {
            var reader = new FileReader();
            
            reader.onload = e => {
                setEventImage(e.target.result)
            }
            
            reader.readAsDataURL(upload.files[0]);
        }
    }

    const foo = () => {
        const form = new FormData();
        form.append('image', uploadBtn.current.files[0]);
        request.post(`${config.API_URL}/upload-image`)
            .send(form)
            .then(res => {
                console.log(res.text);
            })
            .catch(console.error)
    }
    return (
        <div className="create-event bg-info">
            <Navbar/>
            <div className="container rounded-top rounded-lg shadow">
                <h1> Create Event </h1>
                <div ref={form} className="container-fluid" >
                    <div className="row upload-image">
                        <div className="upload-image">
                            { eventImage && <img src={eventImage}/> }

                            <input name="image" ref={uploadBtn} onChange={handleFileUpload} type="file" hidden/>
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
                        <div className="input col">
                            <label> Description </label>
                            <textarea className="form-control" rows="4"/>
                        </div>
                        <div className="input col-12">
                            <label> Address </label>
                            <input className="form-control" name="address"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Subdistrict </label>
                            <input className="form-control" name="subdistrict"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> City/State </label>
                            <input className="form-control" name="city_state"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Zipcode </label>
                            <input className="form-control" name="zipcode"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Country </label>
                            <input className="form-control" name="text"/>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={foo}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage;