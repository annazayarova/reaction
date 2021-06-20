import styled from 'styled-components';
import React from 'react';

import LoadingSpinner from './Loadings/LoadingSpinner';

const Button = ({
    className,
    disabled,
    label,
    onClick,
    regular,
    red,
    notTransparent,
    loading,
    rounded
}) => {

    return (
        <Root className={ className }
            disabled={ disabled }
            onClick={ onClick }
            regular={ regular }
            red={ red }
            notTransparent={ notTransparent }
            loading={ loading }
            rounded={ rounded }
        >
            { label }

            { loading && <StyledLoadingSpinner /> }
        </Root>
    );
}

export default Button;

const Root = styled.button`
    background: ${ ({ theme, notTransparent }) => notTransparent ? theme.primary : 'none' };
    border-radius: ${ ({ rounded }) => rounded ? '4px' : '0' };
    border: none;
    cursor: pointer;
    color: ${ ({ theme, red, notTransparent }) => red ? theme.red : notTransparent ? 'white' : theme.text };
    font-family: ${ ({ regular }) => regular ? 'regular' : 'bold' };
    font-size: 16px;
    height: ${ ({ notTransparent }) => notTransparent ? '56px' : 'auto'};
    margin: 0;
    outline: none;
    padding: 0;
    outline: none;
    position: relative;
    width: ${ ({ notTransparent }) => notTransparent ? '100%' : 'auto'};
    pointer-events: ${ ({ loading }) => loading ? 'none' : '' };

    &:disabled {
        color: ${ ({ notTransparent, theme }) => notTransparent ? '' : theme.disabled };
        cursor: unset;
        pointer-events: none;
    }

    &:active {
        opacity: 0.9;
    }

    &:hover {
        opacity: 0.9;
    }
`;

const StyledLoadingSpinner = styled(LoadingSpinner)`
    position: absolute;
    right: 16px;
    top: 18px;
`;
