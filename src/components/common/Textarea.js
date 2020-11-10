import React from 'react';
import styled from 'styled-components';

const Textarea = ({
    value,
    onChange,
    placeholder,
    hidden
}) => (
        <Root value={ value }
            onChange={ onChange }
            placeholder={ placeholder }
            rows={ 3 }
            lineThrough={ hidden }
        />
);

export default Textarea;

const Root = styled.textarea`
    -webkit-appearance: none;
    background: transparent;
    border-radius: 0;
    border: none;
    color: ${ ({ theme }) => theme.placeholder };
    font-size: 14px;
    line-height: 20px;
    outline: none;
    padding: 0;
    font-family: regular, Verdana;
    width: 100%;
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };

    ::placeholder {
        color: ${ ({ theme }) => theme.grey };
    }
`;
