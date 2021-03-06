import React from 'react';
import styled from 'styled-components';

import Category from './Category';

const Categories = ({ 
    categories, 
    items, 
    invisible, 
    userId
}) => {
    return (
        <Root>
            { categories.map(category => (
                <Category key={ category.id }
                    category={ category }
                    items={ items }
                    invisible={ invisible }
                    userId={ userId }
                />
            ))}
        </Root>
    );
}

export default Categories;

const Root  = styled.div`
    position: relative;
`;
