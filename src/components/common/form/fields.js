import React from "react";
import "./fields.scss";
import classnames from "classnames";
import { formBelow } from "src/views/event/create-event/form-definition";

const makeClassName = errors =>
  classnames({
    "form-control": true,
    "is-valid": errors && errors.length == 0,
    "is-invalid": errors && errors.length != 0
  });

const ErrorContainer = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="error-container">
      {errors.map(err => (
        <div className="text-danger"> {err} </div>
      ))}
    </div>
  );
};

export const setForm = dispatch => data => {
  dispatch({
    type: "SET_FORM",
    payload: data,
  })
}

export const updateForm = dispatch => fieldName => event =>
  dispatch({
    type: "UPDATE",
    payload: {
      field: fieldName,
      value: event.target.value
    }
  });

export const checkForm = dispatch => fieldName => event =>
  dispatch({
    type: "CHECK",
    payload: {
      field: fieldName,
      value: event.target.value
    }
  });

const noValidHack = errors => {
  if (!errors) return errors;
  if (errors.length === 0) return null;
  return errors;
};

export const InputField = ({
  name,
  type,
  label,
  width,
  value,
  errors,
  onChange,
  onBlur,
  placeholder,
  ...otherProps
}) => {
  return (
    <div
      className={
        "input mt-2 text-dark " +
        width
          .split(" ")
          .map(w => "col-" + w)
          .join(" ")
      }
    >
      <label> {label} </label>
      {(() => {
        switch (type) {
          case "textarea":
            return (
              <textarea
                value={value}
                className={makeClassName(errors)}
                onChange={onChange(name)}
                onBlur={onBlur(name)}
                rows="4"
                placeholder={placeholder}
              />
            );
          case "options":
            const { choice } = otherProps;
            return (
              <select
                value={value}
                className={makeClassName(noValidHack(errors))}
                onChange={onChange(name)}
                onBlur={onBlur(name)}
              >
                {choice.map(({ display, value }) => (
                  <option value={value}> {display}</option>
                ))}
              </select>
            );
          default:
            return (
              <input
                type={type}
                value={value}
                className={makeClassName(errors)}
                onChange={onChange(name)}
                onBlur={onBlur(name)}
                placeholder={placeholder}
              />
            );
        }
      })()}
      <ErrorContainer errors={errors} />
    </div>
  );
};
