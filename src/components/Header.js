import React from 'react';
import styled from 'styled-components';

import Share from './common/Share';
import Settings from './Settings';
import Title from './common/Title';

const Header = ({
    onToggleTheme,
    theme,
    themeToggled,
    userId,
    businessName
}) => {
    return (
        <Root>
            <Settings theme={ theme }
                onToggleTheme={ onToggleTheme }
                themeToggled={ themeToggled }
                userId={ userId }
            />

            <Title medium>
                { businessName }
            </Title>

            <Share />
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
    position: relative;
    width: 100%;
`;
