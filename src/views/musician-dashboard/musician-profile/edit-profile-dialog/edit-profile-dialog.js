import React, { useRef } from 'react';
import './edit-profile-dialog.scss';
import ImageUploader from 'src/components/common/image-upload/image-upload';
import config from 'src/config';
import { formStateBuilder } from 'src/components/common/form/form-state';
import {editProfileFormDef} from './edit-profile-definition';
import FormV2 from 'src/components/common/form/form-v2';
import { setForm } from 'src/components/common/form/fields';
import request from 'superagent';

const EditProfileDialog = ({userId}) => {
    const [musicianInfo, dispatchMusicianInfo] = formStateBuilder(editProfileFormDef)();
    const hasFetch = useRef(false);

    if (!hasFetch.current) {
        hasFetch.current = true;
        request(config.API_URL + `/user/${userId}`)
        .withCredentials()
        .then(res => {
            setForm(dispatchMusicianInfo)(res.body);
        })
        .catch(err => {
            alert(`Error getting musician #${userId} info ${err.response.text}`);
            console.error("Error", err);
        })
    }
    

    return (
        <div className="edit-profile-dialog">
            <div className="title"> Edit profile </div>
            <ImageUploader
                setImageFile={() => {}}
                title="Upload profile"
                initialImage={`${config.API_URL}/user/profile-pic/${userId}`}
            />
            <FormV2
                dispatch={dispatchMusicianInfo}
                formData={musicianInfo}
                formDef={editProfileFormDef}
            />
            <FormV2
            
            />
        </div>
    )
}

export default EditProfileDialog;