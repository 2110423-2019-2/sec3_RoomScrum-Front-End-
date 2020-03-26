import { useReducer } from "react";

const updateForm = (updateInfo, form, fields) => {
  const { field, value } = updateInfo;
  if (!fields[field]) return form;
  return {
    ...form,
    [field]: {
      ...form[field],
      value
    }
  };
};

const validateFields = (validators, value, allData) => {
  if (!validators) return [];
  // validate all, filter false
  return validators.map(validator => validator(value, allData)).filter(t => t);
};

const checkForm = (updateInfo, form, validator) => {
  let { field, value } = updateInfo;
  if (!validator[field]) return form;
  return {
    ...form,
    [field]: {
      ...form[field],
      errors: validateFields(validator[field], value, form)
    }
  };
};

const checkAll = (form, validator) => {
  console.log("check:", form);
  console.log("check validator:", validator);
  for (let field in validator) {
    form[field] = {
      ...form[field],
      errors: validateFields(validator[field], form[field].value, form)
    };
  }
  return { ...form };
};

// field is map from available fields to true
const formReducer = (validator, field) => (form, action) => {
  switch (action.type) {
    case "UPDATE": // when typing
      return updateForm(action.payload, form, field);
    case "CHECK": // onblur or onsubmit/
      return checkForm(action.payload, form, validator);
    case "SET_FORM":
      const result = {};
      for (let key in field)
        result[key] = {
          value: action.payload[key]
        };
      return result;
    case "PRE_SUBMIT":
      return checkAll(form, validator);
    default:
      return form;
  }
};

export const formStateBuilder = (formDefinition, defaultValue = {}) => {
  const validator = {};
  const field = {};
  const initState = {};
  for (let key in formDefinition) {
    validator[key] = formDefinition[key].validator || [];
    field[key] = true;
    initState[key] = {
      value: defaultValue[key] || formDefinition[key].default
    };
  }
  return () => useReducer(formReducer(validator, field), initState);
};
