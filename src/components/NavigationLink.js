import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavHashLink } from 'react-router-hash-link';
import { Link } from 'react-scroll'

import { tenantRoute } from '../helpers/routes';
import { AuthContext } from '../Auth';
import Text from './common/Text';

const Navigation = ({
    category,
    activeLink,
    navigationRef
}) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Root hidden={ !currentUser && category.hidden }>
            { (currentUser || !category.hidden) &&
                <StyledLink to={ category.id }
                    spy={ true }
                    smooth={ true }
                    offset={ -152 }
                    >
                        <StyledText uppercase
                            small
                            key={ category.id }
                            disabled={ category.hidden }
                            data-attribute={ category.name }
                        >
                            { category.name }
                        </StyledText>
                </StyledLink>
            }
        </Root>
    )
};

export default Navigation;

const StyledText = styled(Text)`
    text-transform: uppercase;

    &:before {
        content: attr(data-attribute);
        display: block;
        font-family: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;

const StyledLink = styled(Link)`
    &.active {
        ${ StyledText } {
            font-family: bold;
        }
    }
`;

const Root = styled.div`
    align-items: center;
    border-right: 1px solid ${ ({ theme, hidden }) => hidden ? 'transparent' : theme.border };
    display: flex;
    cursor: pointer;
    height: 100%;
    padding: ${ ({ hidden }) => hidden ? 0 : '0 24px' };
`;
