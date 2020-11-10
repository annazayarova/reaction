import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import AddNewItem from './AddNewItem'
import Block from './common/Block';
import Button from './common/Button';
import Caption from './common/Caption';
import db from '../services/firebase';
import Link from'./common/Link';
import ModalFull from './common/ModalFull';
import Toggle from './common/Toggle';
import Text from './common/Text';
import KeyValue from './common/KeyValue';
import Items from './Items';

const Category = ({
    category,
    items,
    invisible,
    userId
}) => {
    const [ name, setName ] = useState(category.name || '')
    const [ open, setOpen ] = useState(false);
    const [ hiddenCategory, setHiddenCategory ] = useState(category.hidden || false);

    const { currentUser } = useContext(AuthContext);

    const updateCategory = () => {
        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('categories')
        .doc(category.id).set({
            name: name,
            hidden: hiddenCategory
        }, { merge: true })

        setOpen(false);
    };

    const filteredItems = items.filter(item => item.categoryId === category.id);

    useEffect(() => {
        if (!open) {
            setName(category.name);
        }
    }, [ open ]);

    if (hiddenCategory && currentUser?.uid !== userId) {
        return null; 
    }
    return (
        <Root id={ category.name }>
            <CategoryBlock>
                <CategoryLine invisible={ invisible }>
                    <StyledCaption grey
                        hiddenCategory={ hiddenCategory }
                    >
                        { category.name }
                    </StyledCaption>

                    { currentUser && currentUser.uid == userId &&
                        <Link text="Edit"
                            onClick={ () => setOpen(true) }
                        />
                    }
                </CategoryLine>

                { currentUser && currentUser.uid == userId &&
                    <AddNewItem categoryId={ category.id }
                        name={ category.name }
                        invisible={ invisible }
                    />
                }

                <Items items={ filteredItems }
                    hiddenCategory={ category.hidden }
                    userId={ userId }
                />
            </CategoryBlock>

            { open && <ModalFull disabled={ !Boolean(name) }
                open={ open }
                onClose={ () => setOpen(false) }
                title="Edit category"
                onSave={ updateCategory }
            >
                <Block>
                    <KeyValue hidden={ hiddenCategory }
                        value={ name }
                        label="Name"
                        onChange={ (e) => setName(e.target.value) }
                    />
                </Block>

                <Block>
                    <Text>{ !hiddenCategory ? 'Hide category' : 'Show category' } </Text>

                    <Toggle checked={ hiddenCategory }
                        onChange={ () => setHiddenCategory(!hiddenCategory) }
                    />
                </Block>

                <Block>
                    <Button regular
                        label="Delete category"
                        onClick={ () => db.firestore()
                            .collection('users')
                            .doc(currentUser.uid)
                            .collection('categories')
                            .doc(category.id)
                            .delete()
                        }
                        red
                    />
                </Block>
            </ModalFull> }
        </Root>
    );
}

export default Category;

const Root = styled.div`
`;

const StyledCaption = styled(Caption)`
    background: ${ ({ theme }) => theme.body };
    padding: 0 4px;
    text-decoration: ${ ({ hiddenCategory }) => hiddenCategory ? 'line-through' : 'none' };
`;

const CategoryBlock = styled.div`
`;

const CategoryLine = styled.div`
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    justify-content: space-between;
    position: relative;
    padding: 0 24px;

    &:after {
        position: absolute;
        content: '';
        top: 7px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${ ({ theme }) => theme.border };
        z-index: -1;
    }
`;
