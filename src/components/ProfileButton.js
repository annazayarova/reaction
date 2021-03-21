import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';


import { AuthContext } from '../Auth';
import { ReactComponent as UserIcon } from '../img/account.svg';
import Block from './common/Block';
import Modal from './common/Modal';
import ModalFull from './common/ModalFull';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';

const ProfileButton = ({
    className,
    businessName
}) => {
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ name, setName ] = useState(businessName || '');

    const { currentUser } = useContext(AuthContext);

    const handleClick = () => {
        setOpen(true);
    }

    const handleLogout = () => {
        setOpen(false);
        db.auth().signOut();
    };

    const updateProfile = useCallback(() => {
        console.log(name)
        currentUser && db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set({
            displayName: name
        }, { merge: true })

        setOpenEdit(false);
    },[]);

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
                        Edit profile
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
                    >
                        Sign out
                    </Block>
                </Modal>
            }

            { openEdit &&
                <ModalFull onClose={ () => setOpenEdit(false) }
                    disabled={ !businessName }
                    title="Edit profile"
                    onSave={ updateProfile }
                >
                    <Block>
                        <KeyValue value={ name }
                            label="Name"
                            onChange={ (e) => setName(e.target.value) }
                            autoFocus
                        />
                    </Block>
            </ModalFull> }
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
