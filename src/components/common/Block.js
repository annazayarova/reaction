import React from 'react';
import styled from 'styled-components';

const Block = ({
    bold,
    center = false,
    children,
    className,
    disabled,
    noBorder,
    onClick,
    red,
    separate = false
}) => {
    return (
        <Root bold={ bold }
            center={ center }
            className={ className }
            disabled={ disabled }
            noBorder={ noBorder }
            onClick={ onClick }
            red={ red }
            separate={ separate }
        >
            { children }
        </Root>
    );
}

export default Block;

const Root  = styled.div`
    align-items: center;
    border-bottom: 1px solid ${ ({ theme, separate, noBorder }) => separate ? theme.separator :  noBorder ? 'transparent' : theme.border };
    display: flex;
    font-family: ${ ({ bold }) => bold ? 'bold' : '' };
    font-size: 16px;
    line-height: 20px;
    justify-content: ${ ({ center }) => center ? 'center' : 'space-between' };
    padding: 16px 24px;
    text-align: center;
    pointer-events: ${ ({ disabled }) => disabled ? 'none' : '' };
    color: ${ ({ disabled, red, theme }) =>
        disabled ? theme.disabled :
        red ? theme.red : theme.text
    };
`;
