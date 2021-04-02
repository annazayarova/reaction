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
    const [slide, setSlide] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const { currentUser } = useContext(AuthContext);

    const user = currentUser && currentUser.uid === userId;

    const handleScroll = () => {
        if (user) {
            setScrollPosition(document.body.getBoundingClientRect().top);
            setSlide(document.body.getBoundingClientRect().top < scrollPosition);
        }
        return;
    }

    useEffect(() => {
        if (user) {
            window.addEventListener("scroll", handleScroll);

            return () =>  window.removeEventListener("scroll", handleScroll);
        }
    });

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
            slide={ slide }
            user={ user }
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
    display: flex;
    height: 64px;
    overflow-x: auto;
    position: sticky;
    top: 0;
    transition: all 400ms ease;
    white-space: nowrap;
    width: 100%;
    z-index: 2;
    transform: ${ ({ slide, user }) => !slide && (user && 'translate(0, 64px)') };

    ::-webkit-scrollbar {
        display: none;
    }
`;
