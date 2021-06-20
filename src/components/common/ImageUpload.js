import React, { useState } from "react";
import styled from 'styled-components';

import db from'../../config/firebase';
import Text from './Text';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import { ReactComponent as EditIcon } from '../../img/edit.svg';

const ImageUpload = ({ image, onImageChange, onDelete }) => {
    return (
        <Root>
			{ !image && <Label>
                <input type="file" onChange={ onImageChange } />
                <Text grey>
                    Choose image
                </Text>
            </Label> }

			{ image && 
                <Image>
                    <img src={ URL.createObjectURL(image) }
				    alt="Reaction menu" />

                    <Controls>
                        <Icon>
                            <label>
                                <StyledEditIcon />
                                <input type="file" onChange={ onImageChange } />
                            </label>
                        </Icon> 

                        <Icon onClick={ onDelete }>
                            <StyledDeleteIcon />
                        </Icon>  
                    </Controls>   
                </Image> 
            }
	</Root>
    );
}

export default ImageUpload;

const Root  = styled.div`
    width: 100%;
    position: relative;
`;

const Image  = styled.div`
    position: relative;
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

const StyledEditIcon  = styled(EditIcon)`
    height: 24px;
    width: 24px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const Label = styled.label`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    display: flex;
    height: 120px;
    justify-content: center;
    width: 100%;
    border-radius: 8px;

    input[type="file"] {
        display: none;
    }
`;
