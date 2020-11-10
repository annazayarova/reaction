import React from 'react';
import styled from 'styled-components';

import Search from './common/Search';
import Settings from './Settings';
import Text from './common/Text';

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

    return (
        <Root>
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <Text mono>
                { displayName }
            </Text>

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
    background-color: ${ ({ theme }) => theme.body };
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    height: 64px;
    justify-content: space-between;
    width: 100%;
    position: relative;
`;

const Logo  = styled.div`

`;
