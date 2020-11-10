import React, { useState } from "react";
import styled from 'styled-components';

import db from "../../services/firebase";
import Text from '../common/Text';

const StoryUpload = ({ userId }) => {
    const [ image, setImage ] = useState(null);
    const [ url, setUrl ] = useState('');
    const [ inProgress, setInProgress ] = useState(0);

    const handleChange = event => {
        setImage(event.target?.files[0]);
    };

    const handleUpload = () => {
        const uploadTask = db.storage().ref(`images/${ userId }/${ image.name }`).put(image);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log('Upload is ' + newProgress + '% done');

                setInProgress(newProgress);
            },
            error => {
                console.log(error);
            },
            () => {
                db.storage()
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                });
            }
        );
    };

    return (
        <Root>
			<input type="file" onChange={ handleChange } />

			{ inProgress > 0 &&
				<Text>Upload is { inProgress.toFixed(0) }% done</Text>
			}

			<button onClick={ handleUpload }>Submit</button>

			<img src={ url || "https://via.placeholder.com/400x300"}
				alt="Reaction menu"
				height="300"
				width="400"
			/>
	</Root>
    );
}

export default StoryUpload;

const Root  = styled.div`

`;
