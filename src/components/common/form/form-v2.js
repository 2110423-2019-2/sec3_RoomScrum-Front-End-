import React, {forwardRef} from 'react';
import { formStateBuilder } from './form-state';
import { updateForm, checkForm, InputField } from './fields';



// this form use state from parent
const FormV2 = ({formData, dispatch, formDef}) => {
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
};

export default FormV2;