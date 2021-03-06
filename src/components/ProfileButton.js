import React, { useState } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { ReactComponent as UserIcon } from '../img/account.svg';
import Block from './common/Block';
import Modal from './common/Modal';
import Text from './common/Text';
import db from '../services/firebase';

const AddButton = ({
    className
}) => {
    const [ open, setOpen ] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }


    const handleLogout = () => {
        setOpen(false);
        db.auth().signOut();
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
                    fromBottom
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                    >
                        Edit profile
                    </Block>

                    <Block center>
                        <Text onClick={ downloadQR }>
                            Download QR code
                        </Text>

                        <StyledQRCode id="QRCode"
                            value={ url }
                            size={ 600 }
                        />
                    </Block>

                    <Block center>
                        <Text onClick={ handleLogout }>
                            Sign out
                        </Text>
                    </Block>
                </Modal>
            }
        </Root>
    );
}

export default AddButton;

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
    width: 24px;
    height: 24px;

    &:last-of-type {
        fill: ${ ({ theme }) => theme.text }
    }
`;
