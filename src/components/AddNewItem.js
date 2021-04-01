import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';
import CategoriesList from './CategoriesList';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Textarea from './common/Textarea';
import Toggle from './common/Toggle';

const AddNewItem = ({
    categories,
    onClose,
    categoryId,
    categoryName
}) => {
    const initialActiveCategoryId = window.localStorage.getItem('activeCategory') || categories[0].id;

    const [ itemName, setItemName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ activeCategoryId, setActiveCategoryId ] = useState(initialActiveCategoryId);
    const [ vegan, setVegan ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const addItem = (e) => {
        e.preventDefault();

        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('items')
        .add({
            name: itemName,
            categoryId: categoryId ? categoryId : activeCategoryId,
            price,
            description,
            vegan,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
    };

    useEffect(() => {
        window.localStorage.setItem('activeCategory', activeCategoryId);
    })

    return (
        <ModalFull disabled={ !itemName || !price }
                title="New item"
                onClose={ onClose  }
                onSave={ addItem }
                label="Create"
            >
                <Block>
                    <KeyValue value={ itemName }
                        label="Name"
                        onChange={ (e) => setItemName(e.target.value) }
                        placeholder="Name"
                        autoFocus={ true }
                    />
                </Block>

                <Block>
                    <KeyValue value={ price }
                        label="Price"
                        onChange={ (e) => setPrice(e.target.value) }
                        placeholder="0,00"
                        type="number"
                    />
                </Block>

                <StyledBlock>
                    <Text bold>Description</Text>

                    <Textarea value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                    />
                </StyledBlock>

                <Block>
                    <CategoryBlock>
                        <StyledText bold>
                            Category
                        </StyledText>

                        { categoryId ? <Text>{ categoryName }</Text>
                            : <CategoriesList categories={ categories }
                                activeCategoryId={ activeCategoryId }
                                onCategoryChange={ (category) => setActiveCategoryId(category) }
                            />
                        }
                    </CategoryBlock>
                </Block>

                <Block>
                    <Text bold>Vegetarian or Vegan</Text>

                    <Toggle checked={ vegan }
                        onChange={ () => setVegan(!vegan) }
                    />
                </Block>
        </ModalFull>
    );
}

export default AddNewItem;

const CategoryBlock = styled.div`
    display: flex;
`;

const StyledText = styled(Text)`
    margin-right: 24px;
`;

const StyledBlock = styled(Block)`
    flex-direction: column;
    align-items: flex-start;

    ${ Text } {
        margin-bottom: 12px;
    }
`;
