import React, { useRef, useState } from 'react';
import './video.scss';


// musician videos (youtube)
const MusicianVideo = ({ musician: { videoUrl } }) => {

    const id = videoUrl.substr(videoUrl.indexOf("?v=") + 3);

    return (
        <div className="musician-video">
            <div className="title"> Videos </div>
            <div className="musician-video-list">
                <div className="yt-wrapper">
                    <div className="yt-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            className="yt-vid"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicianVideo