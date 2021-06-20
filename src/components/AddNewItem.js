import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import CategoriesList from './CategoriesList';
import db from '../config/firebase';
import ImageUpload from './common/ImageUpload';
import KeyValue from './common/KeyValue';
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
    const { t, i18n } = useTranslation();

    const initialActiveCategoryId = window.localStorage.getItem('activeCategory') || categories[0].id;

    const [ itemName, setItemName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ activeCategoryId, setActiveCategoryId ] = useState(initialActiveCategoryId);
    const [ vegan, setVegan ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ progress, setProgress ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleImageChange = event => {
        setImage(event.target?.files[0]);
    };
    
    const handleImageDelete = () => {
        setImage(null);
    };

    const addItem = async (e) => {
        e.preventDefault();
        setProgress(true);
        const storageRef = db.storage().ref(`images/${ currentUser.uid }/`);

        const imageRef = storageRef.child(image.name);

        await imageRef.put(image)

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
            imageUrl: await imageRef.getDownloadURL(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
        setProgress(false);
    };

    useEffect(() => {
        window.localStorage.setItem('activeCategory', activeCategoryId);
    })

    return (
        <ModalFull disabled={ !itemName || !price }
                title={ t("New item") }
                onClose={ onClose  }
                onSave={ addItem }
                label={ progress ? "Creating..." : "Create" }
            >
                <Block>
                    <ImageUpload onImageChange={ handleImageChange }
                        image={ image }
                        onDelete={ handleImageDelete }
                    />
                </Block>

                <Block>
                    <CategoryBlock>
                        <StyledText bold>
                        { t("Category") }
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
                    <KeyValue value={ itemName }
                        label={ t("Name") }
                        onChange={ (e) => setItemName(e.target.value) }
                        placeholder={ t("Name") }
                    />
                </Block>

                <Block>
                    <KeyValue value={ price }
                        label={ t("Price") }
                        onChange={ (e) => setPrice(e.target.value) }
                        placeholder="0,00"
                        type="number"
                    />
                </Block>

                <StyledBlock>
                    <Text bold>{ t("Description") }</Text>

                    <Textarea value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                        placeholder={ t("Write description here") }
                    />
                </StyledBlock>

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
