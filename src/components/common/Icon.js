import React from 'react';
import styled from 'styled-components';


const Tag = () => {
    return (
        <Root >
        </Root>
    );
}

export default Tag;

const Root = styled.div`
    color: ${ ({ theme }) => theme.green };
    text-transform: uppercase;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.75px;
    font-family: bold;
    margin-right: 8px;
    text-transform: uppercase
`;
