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
            name: categoryName.trim(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        onClose();
    };

    return (
        <Modal onClose={ onClose }
            title="New category"
        >
            <form onSubmit={ addCategory }>
                <Block>
                    <Input value={ categoryName }
                        onChange={ (e) => setCategoryName(e.target.value) }
                        placeholder="Category name"
                        autoFocus
                        center
                    />
                </Block>

                <Block center bold uppercase
                    disabled={ !categoryName }
                    onClick={ addCategory }
                >
                    Create
                </Block>
            </form>
        </Modal>
    )
}
export default NewCategoryModal;
