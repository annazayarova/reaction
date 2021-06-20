import React from 'react';
import styled from 'styled-components';

//import { increment, decrement } from '../pages/Tenant';

import Item from './Item';

const Items = ({
    hiddenCategory,
    items,
    userId
}) => {
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
