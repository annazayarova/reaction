import React, { useRef, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import NavigationLink from './NavigationLink';
import Search from '../components/common/Search';
import Text from '../components/common/Text';

const Navigation = ({
    categories,
    userId,
    onSearchChange,
    resetSearch,
    searchValue
}) => {
    const { currentUser } = useContext(AuthContext);

    const user = currentUser && currentUser.uid === userId;

    const headerRef = useRef(null);

    if (!categories.length && currentUser) {
        return (
        <StyledText grey small>
            The menu is empty. Start creating categories by clicking + button at the right top corner
        </StyledText>
        )
    }

    if (!categories.length) {
        return <StyledText grey small>The menu is empty</StyledText>;
    }

    return (
        <Root ref={ headerRef }
            user={ user }
            searchValue={ searchValue }
        >
            <Search value={ searchValue }
                reset={ resetSearch }
                onChange={ onSearchChange }
            />

            { categories && categories.map((category) => (
                <NavigationLink category={ category }
                    key={ category.id }
                />
            )) }
        </Root>
    )
};

export default Navigation;

const StyledText = styled(Text)`
    margin: 24px;
    text-align: center;
`;

const Root = styled.div`
    background: ${ ({ theme }) => theme.body };
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    margin-bottom: ${ ({ searchValue }) => searchValue ? '24px' : 0 };
    display: flex;
    height: 64px;
    overflow-x: auto;
    overflow-y: hidden;
    position: sticky;
    top: ${ ({ user }) => user ? '64px' : 0 };
    white-space: nowrap;
    width: 100%;
    z-index: 2;

    ::-webkit-scrollbar {
        display: none;
    }
`;
