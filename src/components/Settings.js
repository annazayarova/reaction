import { Link } from "react-router-dom";
import { ReactComponent as CheckedIcon } from '../img/checked.svg';
import { ReactComponent as MenuIcon } from '../img/menu.svg';
import { useTranslation } from 'react-i18next';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import Collapse from './common/Collapse';
import db from '../services/firebase';
import Slider from './common/Slider';
import Text from './common/Text';
import Toggle from './common/Toggle';

import { ReactComponent as DownloadIcon } from '../img/download.svg';

const Settings = ({
    theme,
    onToggleTheme,
    themeToggled,
    userId
}) => {
    const [open, setOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { t, i18n } = useTranslation();

	const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const languages = [ {
        name: "English",
        action: () => changeLanguage('en')
    }, {
        name: "Ελληνικά - Greek",
        action: () => changeLanguage('gr')
    } ];

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
        <Root>
            <Menu onClick={ () => setOpen(true) }>
                <StyledMenuIcon />
            </Menu>

            <Slider open={ open }
                onClose={ () => setOpen(false) }
            >
                <Block noBorder>
                    <Text>
                        Activate { theme === 'light' ? 'dark' : 'light' } mode
                    </Text>

                    <Toggle id="theme"
                        onChange={ onToggleTheme }
                        checked={ themeToggled }
                    />
                </Block>

                { currentUser?.uid !== userId &&
                    <Block>
                        <Link to="/login">
                            <Text>
                                Are you a store owner?
                            </Text>
                        </Link>
                    </Block>
                }

                { currentUser && currentUser.uid == userId &&
                    <>
                        <Block separate>
                            <DownloadLink onClick={ downloadQR }>
                                <Text>
                                    Download QR code
                                </Text>

                                <StyledDownloadIcon />
                            </DownloadLink>

                            <StyledQRCode id="QRCode"
                                value={ url }
                                size={ 600 }
                            />
                        </Block>

                        <Block>
                            <Text onClick={ handleLogout }>
                                Logout
                            </Text>
                        </Block>
                    </>
                }
            </Slider>
        </Root>
    );
}

export default Settings;

const StyledDownloadIcon = styled(DownloadIcon)`
    width: 16px;
    height: 16px;
        path {
            fill: ${ ({ theme }) => theme.text }
        }
`;

const DownloadLink  = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Root  = styled.div`
`;

const StyledQRCode = styled(QRCode)`
    display: none;
`;

const Menu  = styled.div`
    border-right: 1px solid ${ ({ theme }) => theme.border };
    width: 64px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledMenuIcon  = styled(MenuIcon)`
    width: 16px;
    height: 16px;

    path {
        fill: ${ ({ theme }) => theme.text };
    }

    :active {
        path {
            fill: ${ ({ theme }) => theme.primary };
        }
    }
`;
