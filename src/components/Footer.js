import React from 'react';
import styled from 'styled-components';

import Text from './common/Text';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

    return (
        <Root>
            <StyledText small
                grey
            >
                © 2020 <span>-</span> { year } powered by

                <Link href={ window.location.origin }>
                    Reaction menu
                </Link>
            </StyledText>
        </Root>
    );
}

export default Footer;

const Root  = styled.div`
    align-items: center;
    background-color: ${ ({ theme }) => theme.content };
    bottom: 0;
    display: flex;
    height: 64px;
    justify-content: center;
    position: absolute;
    text-align: center;
    width: 100%;
`;

const Link  = styled.a`
    margin-left: 7px;
    color: ${ ({ theme }) => theme.primary };
    font-family: medium;
`;

const StyledText  = styled(Text)`
    span {
        color: ${ ({ theme }) => theme.primary };
        font-family: bold;
    }
`;
