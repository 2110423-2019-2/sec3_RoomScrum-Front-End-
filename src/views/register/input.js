import React from 'react';

const InputField = ({ name, type, label }) => {
    return (
        <div className="form-group row">
                <label for={name} className="col-sm-3 col-form-label"> {label} </label>
                <div className="col-sm-9">
                    <input type={type} className="form-control" id={name} />
                </div>
        </div>
    )
}

export default InputField;