import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from '../img/menu.svg';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Block from './common/Block';
import Languages from './Languages';
import Slider from './common/Slider';
import Text from './common/Text';
import Toggle from './common/Toggle';

const Settings = ({
    theme,
    onToggleTheme,
    themeToggled
}) => {
    const [open, setOpen] = useState(false);

    const { t, i18n } = useTranslation();

    return (
        <Root>
            <Menu onClick={ () => setOpen(true) }>
                <StyledMenuIcon />
            </Menu>

            <Slider open={ open }
                onClose={ () => setOpen(false) }
            >
                <Languages />

                <Block>
                    <Text>
                        { t('activate') }

                        <Mode>
                            { theme === 'light' ? 'dark' : 'light' }
                        </Mode>

                        { t('mode') }
                    </Text>

                    <Toggle id="theme"
                        onChange={ onToggleTheme }
                        checked={ themeToggled }
                    />
                </Block>

                <Block>
                    <Link to="/">
                        <Text>
                            { t('are_you_a_store_owner') }?
                        </Text>
                    </Link>
                </Block>
            </Slider>
        </Root>
    );
}

export default Settings;

const Mode = styled.span`
    margin: 0 6px;
`;

const Root  = styled.div`
`;

const Menu  = styled.div`
    cursor: pointer;
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
`;
