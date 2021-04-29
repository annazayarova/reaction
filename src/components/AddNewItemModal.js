import React, { useState, useContext } from 'react';
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

const NewItemModal = ({
    categoryId,
    categories,
    open,
    onClose
}) => {
    const [ itemName, setItemName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ activeCategory, setActiveCategory ] = useState('');

    const { currentUser } = useContext(AuthContext);

    const addItem = (e) => {
        e.preventDefault();

        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('items')
        .add({
            name: itemName,
            categoryId,
            price,
            description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
    };

    return (
        <ModalFull disabled={ !itemName || !price }
                open={ open }
                title="New item"
                onClose={ onClose  }
                onSave={ addItem }
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
                    />
                </Block>

                <Block>
                    <CategoryBlock>
                        <StyledText bold>
                            Category
                        </StyledText>

                        <CategoriesList categories={ categories }
                            activeCategory={ activeCategory }
                        />
                    </CategoryBlock>
                </Block>

                <Block>
                    <Textarea value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                        placeholder="Description"
                    />
                </Block>
        </ModalFull>
    );
}

export default NewItemModal;

const CategoryBlock = styled.div`
    display: flex;
`;

const StyledText = styled(Text)`
    margin-right: 24px;
`;
