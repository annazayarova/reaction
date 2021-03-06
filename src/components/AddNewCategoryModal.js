import React, { useState, useContext } from 'react';
import firebase from 'firebase';

import { AuthContext } from '../Auth';
import Button from './common/Button';
import db from '../services/firebase';
import Input from './common/Input';
import Block from './common/Block';
import Modal from './common/Modal';

const NewCategoryModal = ({
    onClose,
    open
}) => {
    const { currentUser } = useContext(AuthContext);

    const [ categoryName, setCategoryName ] = useState('');

    const addCategory = (e) => {
        e.preventDefault();

        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('categories')
        .add({
            name: categoryName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
    };

    return (
        <Modal open={ open }
            onClose={ onClose }
            title="New category"
        >
            <Block>
                <Input value={ categoryName }
                    onChange={ (e) => setCategoryName(e.target.value) }
                    placeholder="Category name"
                    autoFocus
                />
            </Block>

            <Block>
                <Button label="Cancel"
                    onClick={ onClose }
                />

                <Button disabled={ !categoryName }
                    onClick={ addCategory }
                    label="Create"
                />
            </Block>
        </Modal>
    )
}
export default NewCategoryModal;
