import React from 'react';
import styled from 'styled-components';

import Search from './common/Search';
import Settings from './Settings';
import Title from './common/Title';

const Header = ({
    businessName,
    onSearchChange,
    resetSearch,
    onToggleTheme,
    theme,
    themeToggled,
    searchValue,
    userId
}) => {

    return (
        <Root searchValue={ searchValue }>
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <StyledTitle medium>
                { businessName }
            </StyledTitle>

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
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-bottom: ${ ({ searchValue }) => searchValue ? '24px' : 0 };
`;

const StyledTitle  = styled(Title)`
    margin-left: 24px;
`;
