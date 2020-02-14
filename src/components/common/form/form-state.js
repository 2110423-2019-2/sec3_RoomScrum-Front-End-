import { useReducer } from "react";

const updateForm = (updateInfo, form, fields) => {
    const {field, value} = updateInfo;
    if (!fields[field]) return form;
    return {
        ...form,
        [field]: {
            ...form[field],
            value,
        }
    };
}

const validateFields = (validators, value) => {
    if (!validators) return []
    // validate all, filter false
    return validators.map(validator => validator(value)).filter(t => t); 
}

const checkForm = (updateInfo, form, validator) => {
    const {field, value} = updateInfo;
    if (!validator[field]) return form;
    return {
        ...form,
        [field]: {
            ...form[field],
            errors: validateFields(validator[field], value),
        }
    };
} 

const formReducer = (validator, field) => (form, action) => {

    switch (action.type) {
        case 'UPDATE': // when typing
            return updateForm(action.payload, form, field);
        case 'CHECK': // onblur or onsubmit/
            return checkForm(action.payload, form, validator);    
        default:
            return form
    }
}

export const formStateBuilder = (formDefinition) => {
    const validator = {};
    const field = {}
    const initState = {}
    for (let key in formDefinition) {
        validator[key] = formDefinition[key].validator || [];
        field[key] = true;
        initState[key] = {
            value: formDefinition[key].default,
        }
    }    
    return () => useReducer(formReducer(validator, field), initState);
}

