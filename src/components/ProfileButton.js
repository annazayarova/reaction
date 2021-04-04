import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { AuthContext } from '../Auth';
import { ReactComponent as UserIcon } from '../img/account.svg';
import Block from './common/Block';
import Modal from './common/Modal';
import db from '../services/firebase';
import Input from './common/Input';
import ImageUpload from './common/ImageUpload';

const ProfileButton = ({
    className
}) => {
    const { currentUser } = useContext(AuthContext);

    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ name, setName ] = useState(currentUser.displayName || '');
    const [ openLogo, setOpenLogo ] = useState(false);
    const [ error, setError ] =  useState('');

    const handleClick = () => {
        setOpen(true);
    }

    const handleLogout = () => {
        setOpen(false);
        db.auth().signOut();
    };

    const updateBusinessName = () => {
        currentUser.updateProfile({
            displayName: name
        }).then(function() {
            setOpenEdit(false);
        }).catch(function(error) {
            setError(error.message);
        });
    };

    const saveLogo = () => {

    };

    const url = window.location.href;

    const downloadQR = () => {
        const canvas = document.getElementById("QRCode");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Root className={ className }>
            <StyledUserIcon onClick={ handleClick }/>

            { open &&
                <Modal open={ open }
                    title="Profile"
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                        onClick={ () => (setOpenEdit(true), setOpen(false)) }
                    >
                        Edit business name
                    </Block>

                    <Block center
                        onClick={ () => (setOpenEdit(true), setOpen(false)) }
                    >
                        Add logo
                    </Block>

                    <Block center
                        onClick={ downloadQR }
                    >
                        Download QR code

                        <StyledQRCode id="QRCode"
                            value={ url }
                            size={ 600 }
                        />
                    </Block>

                    <Block onClick={ handleLogout }
                        center
                        bold
                    >
                        Sign out
                    </Block>
                </Modal>
            }

            { openEdit &&
                <Modal onClose={ () => setOpenEdit(false) }
                    title="Edit name"
                    error={ error }
                >
                    <Block center>
                        <Input value={ name }
                            onChange={ (e) => setName(e.target.value) }
                            placeholder="Business name"
                            autoFocus
                            center
                        />
                    </Block>

                    { error &&
                        <Block red small center>
                            { error }
                        </Block>
                    }
                    <Block bold center
                    onClick={ updateBusinessName }
                    disabled={ !name || currentUser.displayName === name.trim() }
                >
                    Update
                </Block>
            </Modal> }

            { openLogo &&
                <Modal onClose={ () => setOpenLogo(false) }
                    title="Add logo"
                >
                    <Block center bold
                        onClick={ saveLogo }
                    >
                        Logo
                    </Block>
                </Modal>
            }
        </Root>
    );
}

export default ProfileButton;

const Root = styled.div`
    align-items: center;
    display: flex;
    height: 64px;
    justify-content: center;
    width: 64px;
`;

const StyledQRCode = styled(QRCode)`
    display: none;
`;

const StyledUserIcon = styled(UserIcon)`
    cursor: pointer;
    width: 24px;
    height: 24px;

    &:last-of-type {
        fill: ${ ({ theme }) => theme.text }
    }
`;
