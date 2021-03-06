import React from 'react';
import styled from 'styled-components';

const Input = React.forwardRef(({
    autoFocus,
    className,
    hidden,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    notTransparent = false
}, ref) => (
    <Root autoFocus={ autoFocus }
        className={ className }
        lineThrough={ hidden }
        name={ name }
        notTransparent={ notTransparent }
        onChange={ onChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
        ref={ ref }
    />
))

export default Input;

const Root = styled.input`
    -webkit-appearance: none;
    background: ${ ({ theme, notTransparent }) => notTransparent ? theme.content : 'transparent'};
    border-radius: 0;
    border: ${ ({ theme, notTransparent }) => notTransparent ? `1px solid ${ theme.border }` : 'none'};
    color: ${ ({ theme }) => theme.text };
    height: ${ ({ notTransparent }) => notTransparent ? '56px' : 'auto'};
    font-size: 14px;
    font-family: regular, Arial;
    outline: none;
    padding: ${ ({ notTransparent }) => notTransparent ? '0 16px' : '0'};
    width: 100%;
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };

    ::placeholder {
        color: ${ ({ theme }) => theme.placeholder };
    }

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${ props => props.theme.content } inset !important;
}
`;
