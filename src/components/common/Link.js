import React from 'react';
import styled from 'styled-components';

import Caption from '../common/Caption';

const Link = ({ className, icon, text, onClick }) => {
    return (
        <Root onClick={ onClick }
            className={ className }
        >
            <StyledCaption>
                { text }
            </StyledCaption>
        </Root>
    );
}

export default Link;

const StyledCaption = styled(Caption)`
    text-decoration: underline;
`;

const Root = styled.button`
    align-items: center;
    display: flex;
    border: none;
    background: none;
    outline: none;
`;
