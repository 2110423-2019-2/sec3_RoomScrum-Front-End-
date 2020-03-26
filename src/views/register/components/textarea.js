import React from "react";

const Textarea = ({ name, label }) => {
  return (
    <div class="form-group row">
      <label className="col-sm-3 col-form-label" for={name}>
        {" "}
        {label}{" "}
      </label>
      <div className="col-sm-9">
        <textarea class="form-control" id={name} rows="3"></textarea>
      </div>
    </div>
  );
};

export default Textarea;
