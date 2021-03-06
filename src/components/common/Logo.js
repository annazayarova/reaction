import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon} from '../../img/rm.svg';

const Logo = () => {
    return (
        <Root>
            <StyledLogoIcon />
        </Root>

    );
}

export default Logo;

const Root = styled.div`
    width: 140px;
`;

const StyledLogoIcon = styled(LogoIcon)`
    path {
        fill: ${ ({ theme }) => theme.text };
    }
`;
