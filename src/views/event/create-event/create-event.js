import React from 'react';
import './create-event.scss';
import { Navbar } from 'src/components/common';

const CreateEventPage = () => {

    const handleSubmit = (event) => {
        alert("Handle");
        event.preventDefault();
    }


    return (
        <div className="create-event bg-info">
            <Navbar/>
            <div className="container rounded-top rounded-lg shadow">
                <h1> Create Event </h1>
                <div className="container-fluid">
                    <div className="row upload-image">
                        <div className="upload-image bg-info">
                            <div className="image-preview">
                                <img src="/foo"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input">
                                <label> Event Name </label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="input">
                                <label> Date </label>
                                <input className="form-control" type="date"/>
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
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Subdistrict </label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> City/State </label>
                            <input className="form-control" type="city_state"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Zipcode </label>
                            <input className="form-control" type="number"/>
                        </div>
                        <div className="input col-sm-6">
                            <label> Country </label>
                            <input className="form-control" type="text"/>
                        </div>
                    </div>
                    <button className="btn btn-primary"> Create Event </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage;