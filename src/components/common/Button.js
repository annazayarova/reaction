import styled from 'styled-components';
import React from 'react';

const Button = ({
    className,
    disabled,
    label,
    onClick,
    regular,
    red,
    notTransparent
}) => {
    return (
        <Root className={ className }
            disabled={ disabled }
            onClick={ onClick }
            regular={ regular }
            red={ red }
            notTransparent={ notTransparent }
        >
            { label }
        </Root>
    );
}

export default Button;

const Root = styled.button`
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background: ${ ({ theme, notTransparent }) => notTransparent ? theme.primary : 'none' };
    border: none;
    color: ${ ({ theme, red, notTransparent }) => red ? theme.red : notTransparent ? 'white' : theme.primary };
    font-family: ${ ({ regular }) => regular ? 'regular' : 'bold' };
    font-size: 15px;
    height: ${ ({ notTransparent }) => notTransparent ? '56px' : 'auto'};
    margin: 0;
    outline: none;
    padding: 0;
    outline: none;
    width: ${ ({ notTransparent }) => notTransparent ? '100%' : 'auto'};

    &:disabled {
        color: ${ ({ theme }) => theme.disabled };
    }
`;
