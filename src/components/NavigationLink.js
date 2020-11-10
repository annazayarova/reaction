import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavHashLink } from 'react-router-hash-link';

import { AuthContext } from '../Auth';
import Text from './common/Text';
import { tenantRoute } from '../helpers/routes';

const Navigation = ({
    category
}) => {
    const { currentUser } = useContext(AuthContext);

    const setActive = () => {
        const path = document.location.pathname + document.location.hash;
        if (path === `${ tenantRoute }#${ category.name }`) {
            return true;
        }
    };

    return (
        <>
            { (currentUser || !category.hidden) &&
                <StyledNavHashLink
                    smooth
                    activeClassName="selected"
                    isActive={ setActive }
                    to={ `#${ category.name }` }
                >
                    <StyledText uppercase
                        key={ category.id }
                        lineThrough={ category.hidden }
                    >
                        { category.name }
                    </StyledText>
                </StyledNavHashLink>
            }
        </>
    )
};

export default Navigation;

const StyledText = styled(Text)`
    margin-right: 24px;
    display: flex;
    text-transform: uppercase;
`;

const StyledNavHashLink = styled(NavHashLink)`
    &.selected {
        ${ StyledText } {
            color:  red;
        }
    }
`;
