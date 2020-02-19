import React, {useState} from 'react';

const InputField = React.forwardRef(({ name, type, label }, ref) => {
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    if (ref) {
        ref.current = value;
    }
    
    return (
        <div className="form-group row">
                <label for={name} className="col-sm-3 col-form-label"> {label} </label>
                <div className="col-sm-9">
                    <input type={type} value={value} onChange={handleChange} className={"form-control "} id={name} />
                </div>
        </div>
    )
})

export default InputField;