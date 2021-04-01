import React from 'react';
import styled from 'styled-components';

import Text from '../common/Text';
import Title from '../common/Title';

const NotFound = ({ title, text }) => {
    return (
        <Root>
            <Title grey>
                { title }
            </Title>

            <Text grey>
                { text }
            </Text>
        </Root>
    );
}

export default NotFound;

const Root  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
`;
