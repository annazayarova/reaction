import React, { useState } from 'react';
import styled from 'styled-components';
import _uniqueId from 'lodash/uniqueId';

const Toggle = ({
    className,
    onChange,
    checked
}) => {
    const [ id ] = useState(_uniqueId('prefix-'));

    const handleChange = (e) => {
        onChange(e.currentTarget.checked);
    }

    return (
        <Root className={ className }>
            <CheckBox id={ id }
                type="checkbox"
                checked={ checked }
                onChange={ handleChange }
            />

            <CheckBoxLabel htmlFor={ id }/>
        </Root>
    );
}

export default Toggle;

const Root = styled.div`
    height: 24px;
    position: relative;
    width: 40px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
`;

const CheckBoxLabel = styled.label`
    background: ${ ({ theme }) => theme.disabled };
    border-radius: 32px;
    cursor: pointer;
    height: 24px;
    left: 0;
    position: absolute;
    top: 0;
    width: 40px;

    &::after {
        background: white;
        border-radius: 50%;
        content: "";
        display: block;
        height: 20px;
        margin: 2px;
        transition: 150ms;
        width: 20px;
    }
`;
const CheckBox = styled.input`
    border-radius: 12px;
    height: 24px;
    opacity: 0;
    width: 40px;
    z-index: 1;

    &:checked + ${ CheckBoxLabel } {
        background: ${ ({ theme }) => theme.green };

        &::after {
            border-radius: 50%;
            content: "";
            display: block;
            height: 20px;
            margin-left: 18px;
            transition: 150ms;
            width: 20px;
        }
    }
`;
