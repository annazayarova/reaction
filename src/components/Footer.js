import React from 'react';
import styled from 'styled-components';

import Caption from './common/Caption';

const Footer = () => {
    return (
        <Root>
            <Caption>
                © 2020 powered by

                <Link href="http://reactionmenu.com" target="_blank">
                    Reaction menu
                </Link>
            </Caption>
        </Root>
    );
}

export default Footer;

const Root  = styled.div`
    height: 64px;
    line-height: 64px;
    text-align: center;
    background-color: ${ ({ theme }) => theme.content };
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const Link  = styled.a`
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin-left: 8px;
    text-decoration: underline;
    color: ${ ({ theme }) => theme.text };

    &:active {
        ${ ({ theme }) => theme.primary };
    }
`;
