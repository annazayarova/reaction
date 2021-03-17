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
            rows={ 5 }
        />
);

export default Textarea;

const Root = styled.textarea`
    -webkit-appearance: none;
    background: transparent;
    border-radius: 0;
    border: none;
    color: ${ ({ theme, grey }) => grey ? theme.grey : theme.text };
    font-size: 15px;
    line-height: 20px;
    outline: none;
    padding: 0;
    font-family: regular, Arial;
    width: 100%;

    ::placeholder {
        color: ${ ({ theme }) => theme.placeholder };
    }
`;
