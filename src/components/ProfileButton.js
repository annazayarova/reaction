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
    className,
    businessName
}) => {
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ name, setName ] = useState(businessName);
    const [ openLogo, setOpenLogo ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleClick = () => {
        setOpen(true);
    }

    const handleLogout = () => {
        setOpen(false);
        db.auth().signOut();
    };

    const updateBusinessName = () => {
        currentUser && db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set({
            displayName: name.trim()
        }, { merge: true })

        setOpenEdit(false);
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
                    disabled={ !businessName }
                    title="Edit name"
                    onSave={ updateBusinessName }
                >
                    <Block>

                    </Block>

                    <Block bold center
                    onClick={ updateBusinessName }
                    disabled={ !name || businessName === name.trim() }
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
