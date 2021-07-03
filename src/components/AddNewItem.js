import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase';
import styled, { useTheme } from 'styled-components';
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
import { resizeImage } from './common/ImageUpload';
import LoadingSpinner from './common/Loadings/LoadingSpinner';

const AddNewItem = ({
    categories,
    onClose,
    categoryId,
    categoryName
}) => {
    const { t, i18n } = useTranslation();

    const theme = useTheme();

    const initialActiveCategoryId = window.localStorage.getItem('activeCategory') || categories[0].id;

    const [ itemName, setItemName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ activeCategoryId, setActiveCategoryId ] = useState(initialActiveCategoryId);
    const [ vegan, setVegan ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ progress, setProgress ] = useState(false);
    const [ imageIsUploading, setImageIsUploading ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const storageRef = db.storage().ref(`images/${ currentUser.uid }/`);

    const handleImageChange = async (event) => {
        setImageIsUploading(true)
        try {
            const resizedImage = await resizeImage(event.target.files[0]);
            setImage(resizedImage);
            setImageIsUploading(false);
        } catch (err) {
          console.log(err);
        }
      };

      const handleImageDelete = async () => {
        setImage(null);
    };

    const addItem = async (e) => {
        e.preventDefault();
        setProgress(true);

        const imageRef = image && storageRef.child(image.name);

        let url = '';

        if (image) {
            try { 
                await imageRef.put(image)
                .then(() => imageRef.getDownloadURL())
                .then((img) => url = img)
            } 
            catch(error) { alert(error) }
        } 

        db.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .collection('items')
            .add({
                categoryId: categoryId ? categoryId : activeCategoryId,
                description,
                imageUrl: url || null,
                name: itemName,
                price: price.trim(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                vegan
            })
        
        setProgress(false);

        onClose();
    };

    useEffect(() => {
        window.localStorage.setItem('activeCategory', activeCategoryId);
    })

    return (
        <ModalFull disabled={ !itemName || !price }
                title={ t("New item") }
                onClose={ onClose  }
                onSave={ addItem }
                label={ progress ? <LoadingSpinner color={ theme.primary } size="24px" /> : t("Create") }
            >
                <Block>
                    <ImageUpload onImageChange={ handleImageChange }
                        image={ image }
                        onDelete={ handleImageDelete }
                        inProgress={ imageIsUploading }
                    />
                </Block>

                <Block>
                    <CategoryBlock>
                        <StyledText bold>
                        { t("Category") }
                        </StyledText>

                        { categoryId ? <CategoryName>{ categoryName }</CategoryName>
                            : <CategoriesList categories={ categories }
                                activeCategoryId={ activeCategoryId }
                                onCategoryChange={ (category) => setActiveCategoryId(category) }
                            />
                        }
                    </CategoryBlock>
                </Block>
                
                <Block>
                    <KeyValue value={ itemName }
                        label={ t("Title") }
                        onChange={ (e) => setItemName(e.target.value) }
                        placeholder={ t("Title") }
                        required
                    />
                </Block>

                <Block>
                    <KeyValue value={ price }
                        label={ t("Price") }
                        onChange={ (e) => setPrice(e.target.value) }
                        placeholder="0.00"
                        type="number"
                        required
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
    min-width: 96px;
    text-align: left;
`;

const CategoryName = styled(Text)`
    text-transform: uppercase;
`;

const StyledBlock = styled(Block)`
    flex-direction: column;
    align-items: flex-start;

    ${ Text } {
        margin-bottom: 12px;
    }
`;
