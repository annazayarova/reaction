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

    const docRef = currentUser && db.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('categories');

    const updateCategory = () => {
        docRef
        .doc(category.id).set({
            name: categoryName
        }, { merge: true })

        setOpenEdit(false);
    };

    const hideCategory = () => {
        docRef
        .doc(category.id).set({
            hidden: !category.hidden
        }, { merge: true })

        setOpenHide(false);
    };

    const deleteCategory = () => {
        docRef
        .doc(category.id)
        .delete()

        //todo delete filteredItems of deleted catigory
        setOpenDelete(false);
    };

    const filteredItems = items.filter(item => item.categoryId === category.id);

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
                    <StyledTitle disabled={ !!category.hidden }>
                        { category.name }
                    </StyledTitle>

                    { currentUser && currentUser.uid === userId &&
                        <StyledMoreIcon onClick={ () => setOpen(true) } />
                    }
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

                    <Block center red bold
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

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const StyledTitle = styled(Title)`
    text-transform: uppercase;
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
