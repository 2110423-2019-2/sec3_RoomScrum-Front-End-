import React from 'react';

const RadioInput = ({ name, label, labels }) => {
    return (
        <fieldset className="form-group">
            <div className="row">
                <legend className="col-form-label col-sm-3 pt-0"> { label } </legend>
                <div className="col-sm-9">
                    <div class="form-check form-check-inline">
                        {
                            labels.map(label =>
                                <>
                                    <div className="form-check">
                                    <input class="form-check-input" type="radio" name={name} id={label} value={label} />
                                    <label class="form-check-label" for={label}> {label} </label>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export default RadioInput;