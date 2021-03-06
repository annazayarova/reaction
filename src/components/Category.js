import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import Button from './common/Button';
import Title from './common/Title';
import db from '../services/firebase';
import ModalFull from './common/ModalFull';
import Toggle from './common/Toggle';
import Text from './common/Text';
import KeyValue from './common/KeyValue';
import Items from './Items';

import { ReactComponent as MoreIcon} from '../img/more.svg';

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
        if (open) {
            setName(category.name);
        }
    }, [category.name, open]);

    if (hiddenCategory && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root>
            <>
                <CategoryName invisible={ invisible }>
                    <StyledTitle hiddenCategory={ hiddenCategory }>
                        { category.name }
                    </StyledTitle>

                    { currentUser && currentUser.uid === userId &&
                        <StyledMoreIcon onClick={ () => setOpen(true) } />
                    }
                </CategoryName>

                <Items items={ filteredItems }
                    hiddenCategory={ category.hidden }
                    userId={ userId }
                />
            </>

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

const StyledMoreIcon = styled(MoreIcon)`
    width: 20px;
    height: 20px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const StyledTitle = styled(Title)`
    text-transform: uppercase;
    text-decoration: ${ ({ hiddenCategory }) => hiddenCategory ? 'line-through' : 'none' };
`;

const CategoryName = styled.div`
    align-items: center;
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    justify-content: space-between;
    padding: 24px;
`;
