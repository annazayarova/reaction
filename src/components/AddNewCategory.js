import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import { ReactComponent as AddIcon } from '../img/add.svg';
import Button from './common/Button';
import db from '../services/firebase';
import Input from './common/Input';
import Block from './common/Block';
import Link from './common/Link';
import Modal from './common/Modal';

const AddNewCategory = () => {
    const { currentUser } = useContext(AuthContext);

    const [ categoryName, setCategoryName ] = useState('');
    const [ open, setOpen ] = useState(false);

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

        setOpen(false);

        setCategoryName('');
    };

    const handleClick = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (!open) {
            setCategoryName('');
        }

    }, [ open ]);

    return (
        <>
            <StyledLink icon={ <AddIcon /> }
                text="+ New category"
                onClick={ handleClick }
            />

            { open &&
                <Modal open={ open }
                    title="New category"
                    onClose={ () => setOpen(false) }
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
                            onClick={ () => setOpen(false) }
                        />

                        <Button disabled={ !categoryName }
                            onClick={ addCategory }
                            label="Add"
                        />
                    </Block>
                </Modal>
            }
        </>
    );
}

export default AddNewCategory;

const StyledLink = styled(Link)`
    margin-right:  24px;
`;
