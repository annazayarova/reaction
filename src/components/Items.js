import React from 'react';
import styled from 'styled-components';

import Item from './Item';

const Items = ({ items, hiddenCategory, userId }) => {
    return (
        <Root>
            { items.map(item => (
                <Item key={ item.id }
                    item={ item }
                    hiddenCategory={ hiddenCategory }
                    userId={ userId }
                />
            ))}
        </Root>
    );
}

export default Items;

const Root = styled.div`
`;
