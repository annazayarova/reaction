import React from 'react';
import styled from 'styled-components';

const Block = ({
    className,
    children,
    center = false,
    separate = false,
    onClick,
    noBorder
}) => {
    return (
        <Root className={ className }
            center={ center }
            separate={ separate }
            onClick={ onClick }
            noBorder={ noBorder }
        >
            { children }
        </Root>
    );
}

export default Block;

const Root  = styled.div`
    align-items: center;
    border-top: 1px solid ${ ({ theme, separate, noBorder }) => separate ? theme.separator :  noBorder ? 'transparent' : theme.border };
    display: flex;
    justify-content: ${ ({ center }) => center ? 'center' : 'space-between' };
    padding: 16px 24px;
`;
