import React, { useRef, useState } from 'react';
import './editprofile.scss';
import ImageUploader from 'src/components/common/image-upload/image-upload';
import config from 'src/config';
import { formStateBuilder } from 'src/components/common/form/form-state';
import FormV2 from 'src/components/common/form/form-v2';
import { setForm } from 'src/components/common/form/fields';
import request from 'superagent';
import { Button, ConfirmDialog } from 'src/components/common';
import { hasError, getFormData } from 'src/components/common/form/util';
import Dialog from 'src/components/common/dialog';
import { userFormDef, musicianFormDef } from "./form-definition";

const EditProfile = ({userId , onClose}) => {
  // const [userForm, dispatchUserForm] = formStateBuilder(userFormDef)();
  // const [musicianForm, dispatchMusicianForm] = formStateBuilder(
  //   musicianFormDef
  // )();
  // const [profileImage, setProfileImage] = useState(null);
  // const [user, setUser] = useState({});
  // const isFetch = useRef(false);

  const [userForm, dispatchUserForm] = formStateBuilder(userFormDef)();
  const hasFetch = useRef(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  if (!hasFetch.current) {
    hasFetch.current = true;
    request(config.API_URL + `/user/${userId}`)
      .withCredentials()
      .then((res) => {
        setForm(dispatchUserForm)(res.body);
      })
      .catch((err) => {
        alert(`Error getting musician #${userId} info ${err.response.text}`);
        console.error("Error", err);
      });
  }
  const submit = async () => {
    // check form
    dispatchUserForm({ type: "PRE_SUBMIT" });
    const ok = !hasError(userForm);
    const newProfileData = getFormData(userForm, userFormDef);
    if (!ok) {
      alert("Please Enter form correctly");
      return;
    }

    if (newProfileImage) {
      console.dir("new profile image", newProfileImage);
      await request
        .post(config.API_URL + "/user/profile-pic")
        .attach("image", newProfileImage)
        .withCredentials()
        .then(() => {
          alert("Uploaded Profile Picture");
        })
        .catch((err) => {
          alert("Profile image upload error");
          console.error("Error uploading profile", err);
        });
    }

    await request
      .post(config.API_URL + `/user/update`)
      .withCredentials()
      .send(newProfileData)
      .then(() => {
        alert("Profile Updated");
        onClose();
        window.location.href = "/hirer/profile/me";
      })
      .catch((err) => {
        alert("update Profile error");
        console.error("Error updating profile", err);
      });
  };

  const discardChange = (confirm) => {
    if (!confirm) return;
    onClose();
  };

  return (
    <div >
      <div className="edit-profile">
        <div className="Title">
          Edit Profile
        </div>
        <ImageUploader
          setImageFile={setNewProfileImage}
          title="Upload profile image"
          initialImage={`${config.API_URL}/user/profile-pic/${userId}`}
        />
        <FormV2
          formData={userForm}
          dispatch={dispatchUserForm}
          formDef={userFormDef}
        />
        <div className="buttons">
          <Button name="Save Changes" type="primary" onClick={submit} />
          <Button
            name="Discard"
            type="danger"
            onClick={() => setShowDiscardDialog(true)}
          />
        </div>
        <Dialog
          isOpen={showDiscardDialog}
          onClose={() => setShowDiscardDialog(false)}
        >
          <ConfirmDialog
            callback={discardChange}
            title="Discard changes ?"
            question="All your change will be lost, your profile won't be updated"
          />
        </Dialog>
      </div>
    </div>
  );
};

export default EditProfile;
