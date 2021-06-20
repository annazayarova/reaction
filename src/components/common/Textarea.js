import React from 'react';
import styled from 'styled-components';

const Textarea = ({
    value,
    onChange,
    placeholder
}) => (
        <Root value={ value }
            onChange={ onChange }
            placeholder={ placeholder }
            rows={ 6 }
        />
);

export default Textarea;

const Root = styled.textarea`
    -webkit-appearance: none;
    background-color: transparent;
    border-radius: 0;
    border: none;
    color: ${ ({ theme, grey }) => grey ? theme.grey : theme.text };
    font-family: regular, Arial;
    font-size: 16px;
    line-height: 20px;
    outline: none;
    padding: 0;
    width: 100%;

    ::placeholder {
        color: ${ ({ theme }) => theme.placeholder };
    }
`;
