import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import AddNewCategory from './AddNewCategory';
import NavigationLink from './NavigationLink';

const Navigation = ({
    categories,
    invisible,
    userId
}) => {
	const { currentUser } = useContext(AuthContext);

    return (
        <Root invisible={ invisible }>
            { currentUser && currentUser.uid == userId && <AddNewCategory /> }

            { categories && categories.map((category) => (
                <NavigationLink category={ category }
                    key={ category.id }
                />
            )) }
        </Root>
    )
};

export default Navigation;

const Root = styled.div`
    -ms-overflow-style: -ms-autohiding-scrollbar;
    -webkit-overflow-scrolling: touch;
    align-items: center;
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    height: 64px;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    padding: 0 24px;
    position: sticky;
    top: 0;
    background: ${ ({ theme }) => theme.body };
    z-index: 2;

    ::-webkit-scrollbar {
        display: none;
    }
`;
