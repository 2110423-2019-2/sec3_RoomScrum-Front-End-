import React, {forwardRef} from 'react';
import { formStateBuilder } from './form-state';
import { updateForm, checkForm, InputField } from './fields';



const Form = forwardRef(({formDef}, ref) => {
    const [formData, dispatch] = formStateBuilder(formDef)();
    if (ref !== null) ref.current = formData;
    return (
        <div className="row">
            {
                Object.keys(formDef)
                    .map(key => {
                        const {type = "text", label = "UNKNOWN LABEL", width = "12", ...otherProps} = formDef[key];
                        const {value, errors} = formData[key];
                        const props = {type, label, width, value, errors,
                            ...otherProps,
                            name: key,
                            onChange: (fieldName) => (evt) => {
                                updateForm(dispatch)(fieldName)(evt);
                                checkForm(dispatch)(fieldName)(evt);
                            },
                            onBlur: checkForm(dispatch),
                        };
                        return (
                            <InputField {...props}/>
                        )
                    })
                }
        </div>
    )
});

export default Form;