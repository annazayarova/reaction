import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

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
    background: ${ ({ theme, notTransparent }) => notTransparent ? theme.primary : 'none' };
    border: none;
    cursor: pointer;
    color: ${ ({ theme, red, notTransparent }) => red ? theme.red : notTransparent ? 'white' : theme.primary };
    font-family: bold;
    font-size: 16px;
    height: ${ ({ notTransparent }) => notTransparent ? '56px' : 'auto'};
    margin: 0;
    outline: none;
    padding: 0;
    outline: none;
    width: ${ ({ notTransparent }) => notTransparent ? '100%' : 'auto'};

    &:disabled {
        color: ${ ({ notTransparent, theme }) => notTransparent ? '' : theme.disabled };
        cursor: unset;
    }

    &:active {
        opacity: 0.9;
    }

    &:hover {
        opacity: 0.9;
    }
`;
