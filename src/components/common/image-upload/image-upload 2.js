import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./image-uploader.scss";

const ImageUploader = ({ setImageFile, title }) => {
  const [image, setImage] = useState(null);
  const uploadFileBtn = useRef();

  const clickUpload = () => {
    uploadFileBtn.current.click();
  };

  const updateImage = () => {
    const upload = uploadFileBtn.current;
    if (upload.files && upload.files[0]) {
      setImageFile(upload.files[0]);
      var reader = new FileReader();

      reader.onload = e => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(upload.files[0]);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="image-uploader">
        {image && <img src={image} />}

        <input
          name="image"
          ref={uploadFileBtn}
          onChange={updateImage}
          type="file"
          hidden
        />
        <div
          className={classNames({
            overlay: true,
            "force-show": !image
          })}
          onClick={clickUpload}
        >
          <div>
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </div>
        </div>
      </div>
      <p> {title}</p>
    </div>
  );
};

export default ImageUploader;
