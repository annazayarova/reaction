import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import React from "react";
import Resizer from "react-image-file-resizer";
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import LoadingSpinner from './Loadings/LoadingSpinner';
import Text from './Text';

export const resizeImage = (image) =>
new Promise((resolve) => {
    Resizer.imageFileResizer(
        image,
        800,
        800,
        "JPEG",
        100,
        0,
        (uri) => {
            resolve(uri);
        },
        "file"
    );
});

const ImageUpload = ({ image, onImageChange, onDelete, inProgress }) => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    if (image) {
        return (
            <Image>
                <img src={ typeof image === 'object' ? URL.createObjectURL(image) : image }
				    alt="Reaction menu" 
                />

                <Controls>
                    <Icon onClick={ onDelete }>
                        <StyledDeleteIcon />
                    </Icon>  
                </Controls>   
            </Image>
        )
    }

    if (inProgress) {
        return (
            <Label>
               <LoadingSpinner color={ theme.primary } 
                size='32px'
               />
            </Label> 
        )
    }

    return (
        <Label>
            <input type="file" onChange={ onImageChange } 
                accept="image/x-png,image/jpeg"
            />
                <Text grey>
                    { t("Add photo") }
                </Text>
        </Label> 
    )
}

export default ImageUpload;

const Image  = styled.div`
    background: ${ ({ theme }) => theme.body };
    position: relative;
    width: 100%;
    min-height: 120px;

    img {
        display: block; 
    }
`;

const StyledDeleteIcon  = styled(DeleteIcon)`
    height: 24px;
    width: 24px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.red }
        }
    }
`;

const Icon  = styled.div`
    align-items: center;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    display: flex;
    height: 40px;
    justify-content: center;
    width: 40px;
    margin-left: 12px;

    input[type="file"] {
        display: none;
    }
`;

const Controls  = styled.div`
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
`;

const Label = styled.label`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    display: flex;
    height: 120px;
    justify-content: center;
    width: 100%;

    input[type="file"] {
        display: none;
    }
`;
