import React from 'react';
import styled from 'styled-components';

import Text from '../common/Text';

const StorySmall = ({
    src,
    title
}) => {
    return (
        <Root>
            <Img src={ src } alt="Reaction menu" />

            <StyledText bold>
                { title }
            </StyledText>
        </Root>
    );
}

export default StorySmall;

const Root  = styled.div`
    width: 40%;
    position: relative;
    margin-right: 8px;
`;

const StyledText  = styled(Text)`
    position: absolute;
    left: 8px;
    bottom: 8px;
`;


const Img  = styled.img`
    width: 100%;

    &:first-of-type {
        margin-left: 24px;
    }
`;
