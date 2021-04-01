import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
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
    const [slide, setSlide] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0)

    const { currentUser } = useContext(AuthContext);

    const handleScroll = () => {
        setScrollPosition(document.body.getBoundingClientRect().top)
        setSlide(document.body.getBoundingClientRect().top > scrollPosition)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () =>  window.removeEventListener("scroll", handleScroll);
    });

    return (
        <Root searchValue={ searchValue }
            slide={ slide }
            user={ currentUser && currentUser.uid === userId }
        >
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <Title medium>
                { businessName }
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
    height: 64px;
    justify-content: space-between;
    margin-bottom: ${ ({ searchValue }) => searchValue ? '24px' : 0 };
    position: fixed;
    z-index: 1;
    width: 100%;
    top: ${ ({ user }) => user ? '64px' : 0 };
    transition: all 400ms ease;
    transform: ${ ({ slide, user }) => !slide && (user ? 'translate(0, -64px)' :  'translate(0, -64px)' )};
`;
