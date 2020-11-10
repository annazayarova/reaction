import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import { ReactComponent as AddIcon } from '../img/add.svg';
import Block from './common/Block';
import db from '../services/firebase';
import Textarea from './common/Textarea';
import KeyValue from './common/KeyValue';
import Link from './common/Link';
import ModalFull from './common/ModalFull';

const AddNewItem = ({ categoryId, name, invisible }) => {
    const [ itemName, setItemName ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');

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

        setOpen(false);

        setItemName('');
        setPrice('');
        setDescription('')
    };

    const handleClick = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (!open) {
            setItemName('');
            setPrice('');
            setDescription('');
        }
    }, [open]);

    return (
        <>
            <StyledLink icon={ <AddIcon /> }
                invisible={ invisible }
                text= { `+ New item for ${ name }` }
                onClick={ handleClick }
            />

            { open && <ModalFull disabled={ !itemName || !price }
                open={ open }
                title="New item"
                onClose={ () => setOpen(false)  }
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
                    <Textarea value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                        placeholder="Description"
                    />
                </Block>
            </ModalFull> }
        </>
    );
}

export default AddNewItem;

const StyledLink = styled(Link)`
    display: ${ ({ invisible }) => invisible ? 'none' : 'flex' };
    margin:  24px 24px 0;
`;
