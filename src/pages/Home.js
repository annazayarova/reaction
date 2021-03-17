import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Parallax from 'parallax-js';

import Title from '../components/common/Title';
import Text from '../components/common/Text';
import Logo from '../components/common/Logo';
import { ReactComponent as CircleLarge} from '../img/circleLarge.svg';
import { ReactComponent as CircleMiddle} from '../img/circleMiddle.svg';
import { ReactComponent as CircleSmall} from '../img/circleSmall.svg';

const Home = () => {
    const sceneEl = useRef(null);

    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
            relativeInput: true,
            hoverOnly: true
        })

        parallaxInstance.enable();

        return () => parallaxInstance.disable();
    }, []);

    return (
        <Root>
            <Circles ref={ sceneEl }>
                <CircleLarge data-depth="0.3" />
                <CircleMiddle data-depth="0.6" />
                <CircleSmall data-depth="0.9" />
            </Circles>

            <Header>
                <Logo />

                <Login to='/signin'
                >
                    Sign in
                </Login>
            </Header>

            <CenteredContent>
                <StyledTitle big>
                    <span>Interactive,</span><br/>flexible and <br />future-oriented<br />digital menu
                </StyledTitle>

                <StyledText big grey medium>
                    For your restaurant, coffee shop, bar or hotel
                </StyledText>

                <Create to='/signup'>
                    Start now
                </Create>

            </CenteredContent>
        </Root>
    );
}

export default Home;

const Circles = styled.div`
    position: absolute;
    overflow: hidden;
    z-index: -1;
    opacity: 0.1;
    top: 76px;
    right: -20%;
    width: 120%;
    height: 120%;

    svg {
        width: 120%;
        height: 120%;
    }

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        top: -20%;
        right: -10%;
    }
`;

const Create = styled(Link)`
    color: ${ ({ theme }) => theme.text };
    font-family: bold;
    font-size: 16px;
    text-decoration: underline;
`;

const Login = styled(Create)`
    height: 100%;
    padding: 24px;
    align-items: center;
    display: flex;
    border-left: 1px solid ${ ({ theme }) => theme.border };
    justify-content: center;
    text-decoration: none;
`;

const Root = styled.div`
    overflow-x: hidden;
`;

const Header = styled.div`
    height: 64px;
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
    }
`;

const StyledTitle = styled(Title)`
    span{
        color: ${ ({ theme }) => theme.primary };
    }
`;

const CenteredContent = styled.div`
    margin: 64px 64px 0;

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        margin: 64px 24px 0;
    }
`;

const StyledText = styled(Text)`
    margin: 24px 0;
`;
