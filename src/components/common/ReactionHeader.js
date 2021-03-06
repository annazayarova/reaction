import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const ReactionHeader = () => {
    return (
        <Root>
            <Link to='/'>
                <Logo />
            </Link>
        </Root>
    );
}

export default ReactionHeader;

const Root = styled.div`
    align-items: center;
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    height: 64px;
    justify-content: center;
    left: 0;
    width: 100%;
    position: absolute;

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        position: relative;
    }
`;
