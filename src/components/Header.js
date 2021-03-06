import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import Search from './common/Search';
import Settings from './Settings';
import Title from './common/Title';
import { ReactComponent as LogoIcon } from '../img/logo.svg';

const Header = ({
    displayName,
    onSearchChange,
    resetSearch,
    onToggleTheme,
    theme,
    themeToggled,
    searchValue,
    userId
}) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Root>
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <Title medium>
                { displayName }
            </Title>

            <Search value={ searchValue }
                reset={ resetSearch }
                onChange={ onSearchChange }
            />
        </Root>
    );
}

export default Header;

const Root  = styled.div`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    justify-content: space-between;
    height: 64px;
    position: relative;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
`;
