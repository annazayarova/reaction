import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import Title from './common/Title';
import db from '../services/firebase';
import Modal from './common/Modal';
import Text from './common/Text';
import Input from './common/Input';
import Items from './Items';
import AddNewItem from './AddNewItem'
import { ReactComponent as MoreIcon} from '../img/more.svg';

const Category = ({
    category,
    categories,
    items,
    invisible,
    userId
}) => {
    const [ categoryName, setCategoryName ] = useState(category.name)
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openHide, setOpenHide ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ openAddItem, setOpenAddItem ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const categoryRef = currentUser && db.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('categories');

    const itemRef = currentUser && db.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('items');

    const updateCategory = () => {
        categoryRef
        .doc(category.id).set({
            name: categoryName
        }, { merge: true })

        setOpenEdit(false);
    };

    const hideCategory = () => {
        categoryRef
        .doc(category.id).set({
            hidden: !category.hidden
        }, { merge: true })

        setOpenHide(false);
    };

    const filteredItems = items.filter(item => item.categoryId === category.id);

    const deleteCategory = () => {
        categoryRef
        .doc(category.id)
        .delete()

        filteredItems.forEach(item =>
            item.categoryId === category.id
            && itemRef.doc(item.id).delete());

        setOpenDelete(false);
    };

    useEffect(() => {
        if (openEdit) {
            setCategoryName(category.name);
        }
    }, [category.name, openEdit]);

    if (category.hidden === true && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root id={ category.id }>
            <>
                <CategoryName invisible={ invisible }>
                    <Title disabled={ !!category.hidden }
                        uppercase
                    >
                        { category.name }
                    </Title>

                    <div>
                        { currentUser && currentUser.uid === userId &&
                            <StyledMoreIcon onClick={ () => setOpen(true) } />
                        }
                    </div>
                </CategoryName>

                { currentUser && currentUser.uid === userId && filteredItems.length === 0 && !invisible &&
                    <StyledText small grey>
                        No items yet. To add items click on + button at the right top corner or use menu of each category
                    </StyledText>
                }

                <Items items={ filteredItems }
                    hiddenCategory={ category.hidden }
                    userId={ userId }
                />
            </>

            { open &&
                <Modal title="Category"
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                        onClick={ () => (setOpenAddItem(true), setOpen(false)) }
                    >
                        Add item
                    </Block>

                    <Block center
                        onClick={ () => (setOpenEdit(true), setOpen(false)) }
                    >
                        Edit
                    </Block>

                    <Block center
                        onClick={ () => (setOpenHide(true), setOpen(false)) }
                    >
                        { category.hidden === true ? 'Show' : 'Hide' }
                    </Block>

                    <Block center red
                        onClick={ () => (setOpenDelete(true), setOpen(false)) }
                    >
                        Delete
                    </Block>
                </Modal>
            }

            { openEdit && <Modal onClose={ () => setOpenEdit(false) }
                title="Edit category"
            >
                <Block>
                    <Input value={ categoryName }
                        onChange={ (e) => setCategoryName(e.target.value) }
                        placeholder="Category name"
                        autoFocus
                        center
                    />
                </Block>

                <Block bold center
                    onClick={ updateCategory }
                    disabled={ !categoryName || category.name === categoryName.trim() }
                >
                    Update
                </Block>
            </Modal> }

            { openHide &&
                <Modal onClose={ () => setOpenHide(false) }
                    title={ category.hidden === true ? 'Show category?' : 'Hide category?'}
                >
                    <Block center>
                        <Text small>The category with all its items will be { category.hidden === true ? 'visible' : 'invisible'} to customers</Text>
                    </Block>

                    <Block center bold
                        onClick={ hideCategory }
                    >
                        { category.hidden === true ? 'Show' : 'Hide'}
                    </Block>
                </Modal>
            }

            { openDelete &&
                <Modal onClose={ () => setOpenDelete(false) }
                    title='Delete category?'
                >
                    <Block center>
                        <Text small>The category with all its items will be deleted</Text>
                    </Block>

                    <Block center bold red
                        onClick={ deleteCategory }
                    >
                        Delete
                    </Block>
                </Modal>
            }

            { openAddItem &&
                <AddNewItem categoryId={ category.id }
                    onClose={ () => setOpenAddItem(false) }
                    categoryName={ category.name }
                    categories={ categories }
                />
            }
        </Root>
    );
}

export default Category;

const Root = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const StyledMoreIcon = styled(MoreIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: rotate(90deg);

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const CategoryName = styled.div`
    align-items: center;
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    justify-content: space-between;
    padding: 24px;
`;

const StyledText = styled(Text)`
    padding: 0 24px 24px;
`;
