import React from 'react';
import styled from 'styled-components';

import Text from '../common/Text';

const Link = ({
    className,
    text,
    onClick
}) => {
    return (
        <Root onClick={ onClick }
            className={ className }
        >
            <StyledText>
                { text }
            </StyledText>
        </Root>
    );
}

export default Link;

const StyledText = styled(Text)`
    text-decoration: underline;
`;

const Root = styled.button`
    align-items: center;
    display: flex;
    border: none;
    background: none;
    outline: none;
`;
