import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import OrderButton from './OrderButton';
import Settings from './Settings';
import Title from './common/Title';

const Header = ({
    onToggleTheme,
    theme,
    themeToggled,
    userId,
    businessName
}) => {
    const { currentUser } = useContext(AuthContext);

    const user = currentUser && currentUser.uid === userId;

    return (
        <Root user={ user }>
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <Title medium>
                { businessName }
            </Title>

            <OrderButton />
        </Root>
    );
}

export default Header;

const Root  = styled.div`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    height: 64px;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: ${ ({ user }) => user ? '64px' : 0 };
    z-index: 2;
`;
