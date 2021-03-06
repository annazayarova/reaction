import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import NavigationLink from './NavigationLink';
import Text from '../components/common/Text';

const Navigation = ({
    categories,
    invisible,
    navigationRef,
    activeLink
}) => {
    const headerRef = useRef(null);

    if (!categories.length) {
        return (
        <StyledText grey small>
            Start by creating the very first category by clicking + button at the right top corner
        </StyledText>
        )
    }

    return (
        <Root invisible={ invisible }
            ref={ headerRef }
        >
            { categories && categories.map((category) => (
                <NavigationLink category={ category }
                    key={ category.id }
                    activeLink={ activeLink }
                    navigationRef={ navigationRef }
                />
            )) }
        </Root>
    )
};

export default Navigation;

const StyledText = styled(Text)`
    margin: 24px;
`;

const Root = styled.div`
    background: ${ ({ theme }) => theme.body };
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    height: 64px;
    overflow-x: auto;
    position: sticky;
    top: 64px;
    white-space: nowrap;
    width: 100%;
    z-index: 2;

    ::-webkit-scrollbar {
        display: none;
    }
`;
