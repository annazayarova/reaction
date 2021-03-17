import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NavHashLink } from 'react-router-hash-link';

import { tenantRoute } from '../helpers/routes';
import { AuthContext } from '../Auth';
import Text from './common/Text';

const Navigation = ({
    category,
    activeLink,
    navigationRef
}) => {
    const { currentUser } = useContext(AuthContext);

    const setActive = () => {
        const path = document.location.pathname + document.location.hash;
        if (path === `${ tenantRoute }#${ category.name }`) {
            return true;
        }
    };

    return (
        <Root hidden={ !currentUser && category.hidden }>
            { (currentUser || !category.hidden) &&
                    <StyledNavHashLink
                        smooth
                        activeClassName="selected"
                        isActive={ setActive }
                        to={ `#${ category.name }` }
                    >
                    <StyledText uppercase
                        small
                        key={ category.id }
                        disabled={ category.hidden }
                    >
                        { category.name }
                    </StyledText>
                </StyledNavHashLink>
            }
        </Root>
    )
};

export default Navigation;

const StyledText = styled(Text)`
    text-transform: uppercase;
`;

const StyledNavHashLink = styled(NavHashLink)`
    &.selected {
        ${ StyledText } {
            color:  red;
        }
    }
`;

const Root = styled.div`
    align-items: center;
    border-right: 1px solid ${ ({ theme, hidden }) => hidden ? 'transparent' : theme.border };
    display: flex;
    height: 100%;
    padding: ${ ({ hidden }) => hidden ? 0 : '0 24px' };
`;
