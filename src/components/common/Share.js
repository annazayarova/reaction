import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ShareIcon } from '../../img/share-outline.svg';

const Share = () => {
    return (
        <Icon>
            <StyledShareIcon />
        </Icon>
    );
}

export default Share;

const StyledShareIcon  = styled(ShareIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
    }}
`;

const Icon  = styled.div`
    cursor: pointer;
    width: 64px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: center;
`;
