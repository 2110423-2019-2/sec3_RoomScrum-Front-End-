import React, { useRef, useState } from 'react';
import './edit-profile-dialog.scss';
import ImageUploader from 'src/components/common/image-upload/image-upload';
import config from 'src/config';
import { formStateBuilder } from 'src/components/common/form/form-state';
import {editProfileFormDef} from './edit-profile-definition';
import FormV2 from 'src/components/common/form/form-v2';
import { setForm } from 'src/components/common/form/fields';
import request from 'superagent';
import { Button, ConfirmDialog } from 'src/components/common';
import { hasError, getFormData } from 'src/components/common/form/util';
import Dialog from 'src/components/common/dialog';

const EditProfileDialog = ({userId, onClose, changeCallback}) => {
    const [formData, dispatchForm] = formStateBuilder(editProfileFormDef)();
    const hasFetch = useRef(false);
    const [newProfileImage, setNewProfileImage] = useState(null);

    const [showDiscardDialog, setShowDiscardDialog] = useState(false);


    // fetch user data to populate user form
    if (!hasFetch.current) {
        hasFetch.current = true;
        request(config.API_URL + `/user/${userId}`)
        .withCredentials()
        .then(res => {
            setForm(dispatchForm)(res.body);
        })
        .catch(err => {
            alert(`Error getting musician #${userId} info ${err.response.text}`);
            console.error("Error", err);
        })
    }

    const submit = async () => {
        // check form
        dispatchForm({ type: "PRE_SUBMIT"});
        const ok = !hasError(formData);
        const newProfileData = getFormData(formData, editProfileFormDef);
        if (!ok) {
            alert("Please Enter form correctly");
            return;
        }

        if (newProfileImage) {
            console.dir("new profile image", newProfileImage)
            await request.post(config.API_URL + '/user/profile-pic')
            .attach("image", newProfileImage)
            .withCredentials()
            .then(() => {
                alert("Uploaded Profile Picture")
            })
            .catch(err => {
                alert("Profile image upload error");
                console.error("Error uploading profile", err);
            })
        }

        await request.post(config.API_URL + `/user/update/${userId}`)
        .withCredentials()
        .send(newProfileData)
        .then(() => {
            alert("Profile Updated")
            changeCallback();
            onClose();
        })
        .catch(err => {
            alert("update Profile error");
            console.error("Error updating profile", err);
        })
    }
    
    const discardChange = (confirm) => {
        if (!confirm) return;
        onClose();
    }

    return (
        <div className="edit-profile-dialog">
            <div className="title"> Edit profile </div>
            <ImageUploader
                setImageFile={setNewProfileImage}
                title="Upload profile"
                initialImage={`${config.API_URL}/user/profile-pic/${userId}`}
            />
            <FormV2
                dispatch={dispatchForm}
                formData={formData}
                formDef={editProfileFormDef}
            />
            {/* <FormV2
            
            /> */}
            <div className="buttons">
                <Button name="Save Changes" type="primary" onClick={submit}/>
                <Button name="Discard" type="danger" onClick={() => setShowDiscardDialog(true)}/>
            </div>
            <Dialog isOpen={showDiscardDialog} onClose={() => setShowDiscardDialog(false)}>
                <ConfirmDialog
                    callback={discardChange}
                    title="Discard changes ?"
                    question="All your change will be lost, your profile won't be updated"
                />
            </Dialog>
        </div>
    )
}

export default EditProfileDialog;