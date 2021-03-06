import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Block from './common/Block';
import Link from './common/Link';
import Text from './common/Text';

import { ReactComponent as ActiveIcon } from '../img/checked.svg';

const CategoriesList = ({
    activeCategoryId,
    className,
    categories,
    onCategoryChange
}) => {
    const [ open, setOpen ] = useState(false);

    const { t, i18n } = useTranslation();

    const changeCategory = category => {
        onCategoryChange(category);
        setOpen(false);
    };

    const activeCategory = categories.find(category => (category.id === activeCategoryId)) || categories[0];
console.log(activeCategoryId)
    return (
        <Root className={ className }>
            <StyledLink onClick={ () => setOpen(true) }
                text={ activeCategory.name || categories[0].name }
            />

            <List open={ open }>
                <BackLink onClick={ () => setOpen(false) }
                    text={ t('back')  }
                />

                { categories.map(category =>
                    <StyledBlock onClick={ () => changeCategory(category.id) }
                        key={ category.id }
                    >
                        <StyledText activeCategory={ activeCategory.id === category.id }>
                            { category.name }
                        </StyledText>

                        { activeCategory.id === category.id && <StyledActiveIcon /> }
                    </StyledBlock>
                )}
            </List>
        </Root>
    );
}

export default CategoriesList;

const StyledActiveIcon = styled(ActiveIcon)`
    width: 20px;
    height: 20px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.primary }
        }
    }
`;

const StyledLink = styled(Link)`
    text-transform: capitalize;
`;

const Root = styled.div`
    display: flex;
    align-items: center;
`;

const BackLink = styled(Link)`
    padding: 24px;
    text-transform: capitalize;
`;

const StyledText = styled(Text)`
    text-transform: capitalize;
    font-family: ${ ({ activeCategory }) => activeCategory && 'bold' }
`;

const List = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    display: ${ ({ open }) => open ? 'block' : 'none' };
    left: 0;
    min-height: 100vh;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
`;

const StyledBlock = styled(Block)`
    width: 100%;
`;
