import React from 'react';
import styled from 'styled-components';

import LoadingBar from './LoadingBar';

const Skeleton = () => {
    return (
        <Root>
            <Navigation>
                <LoadingBar />
            </Navigation>

            <Title>
                <LoadingBar />
            </Title>

            <StyledLoadingBar height="100px"
                width="calc(100% - 48px)"
            />

            <StyledLoadingBar height="100px"
                width="calc(100% - 48px)"
            />

        </Root>
    );
}

export default Skeleton;

const Root  = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Navigation  = styled.div`
    width: 100%;
    padding: 24px;
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
`;

const Title  = styled.div`
    width: 100%;
    padding: 24px 24px 12px;
`;

const StyledLoadingBar  = styled(LoadingBar)`
    margin: 24px 0 0;
`;
