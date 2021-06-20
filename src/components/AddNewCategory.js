import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../Auth';
import db from '../config/firebase';
import Input from './common/Input';
import Block from './common/Block';
import Modal from './common/Modal';

const NewCategoryModal = ({
    onClose,
    open
}) => {
    const { t, i18n } = useTranslation();

    const { currentUser } = useContext(AuthContext);

    const [ categoryName, setCategoryName ] = useState('');

    const addCategory = (e) => {
        e.preventDefault();

        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('categories')
        .add({
            name: categoryName.trim(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
    };

    return (
        <Modal onClose={ onClose }
            title={ t("New category") }
        >
            <form onSubmit={ addCategory }>
                <Block>
                    <Input value={ categoryName }
                        onChange={ (e) => setCategoryName(e.target.value) }
                        placeholder={ t("Category name") }
                        autoFocus
                        center
                    />
                </Block>

                <Block center 
                    bold
                    disabled={ !categoryName }
                    onClick={ addCategory }
                >
                    { t("Create") }
                </Block>
            </form>
        </Modal>
    )
}
export default NewCategoryModal;
