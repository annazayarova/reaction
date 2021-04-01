import React, { useRef, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import NavigationLink from './NavigationLink';
import Text from '../components/common/Text';
import { AuthContext } from '../Auth';

const Navigation = ({
    categories,
    userId
}) => {
    const [slide, setSlide] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        setScrollPosition(document.body.getBoundingClientRect().top);
        setSlide(document.body.getBoundingClientRect().top < scrollPosition);
        setShow(window.pageYOffset > 150)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () =>  window.removeEventListener("scroll", handleScroll);
    });

    const headerRef = useRef(null);
    const { currentUser } = useContext(AuthContext);

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
            show={ show }
            slide={ slide }
            user={ currentUser && currentUser.uid === userId }
        >
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
    opacity: ${ ({ show }) => show ? 1 : 0 };
    overflow-x: auto;
    position: fixed;
    top: 0;
    transform: ${ ({ user, slide }) => !slide && (user ? 'translate(0, 128px)' : 'translate(0, 64px)') };
    transition: all 400ms ease;
    visibility: ${ ({ show }) => show ? 'visible' : 'hidden' };
    white-space: nowrap;
    width: 100%;
    z-index: 2;

    ::-webkit-scrollbar {
        display: none;
    }
`;
