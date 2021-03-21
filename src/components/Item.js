import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as MoreIcon} from '../img/more.svg';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';
import Modal from './common/Modal';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Textarea from './common/Textarea';

const Item = ({
    item,
    hiddenCategory,
    userId
}) => {
    const [ itemName, setItemName ] = useState(item.name || '')
    const [ price, setPrice ] = useState(item.price || '')
    const [ description, setDescription ] = useState(item.description || '')
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openHide, setOpenHide ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const docRef = currentUser && db.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('items');

    const updateItem = () => {
        docRef
        .doc(item.id).set({
            name: itemName.trim(),
            price: price.trim(),
            description: description.trim()
        }, { merge: true })

        setOpenEdit(false);
    };

    const hideItem = () => {
        docRef
        .doc(item.id).set({
            hidden: !item.hidden
        }, { merge: true })

        setOpenHide(false);
    };

    const deleteItem = () => {
        docRef
        .doc(item.id)
        .delete()

        setOpenDelete(false);
    };

    if ((item.hidden === true || hiddenCategory) && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root>
            <Content>
                <Left>
                    <Name bold
                        disabled={ !!item.hidden || hiddenCategory }
                    >
                        { item.name }
                    </Name>

                    { item.description &&
                        <Description disabled={ !!item.hidden || hiddenCategory }>
                            { item.description }
                        </Description>
                    }

                    <Text disabled={ !!item.hidden || hiddenCategory }
                        medium primary={ !(item.hidden || hiddenCategory) }
                    >
                        € { Number(item.price).toFixed(2) }
                    </Text>
                </Left>

                <Right>
                    { currentUser && currentUser.uid === userId &&
                        <StyledMoreIcon onClick={ () => setOpen(true) } />
                    }
                </Right>
            </Content>

            { open &&
                <Modal title="Item"
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                        onClick={ () => (setOpenEdit(true), setOpen(false)) }
                    >
                        Edit
                    </Block>

                    <Block center
                        onClick={ () => (setOpenHide(true), setOpen(false)) }
                    >
                        { item.hidden === true ? 'Show' : 'Hide' }
                    </Block>

                    <Block center red bold
                        onClick={ () => (setOpenDelete(true), setOpen(false)) }
                    >
                        Delete
                    </Block>
                </Modal>
            }

            { openEdit &&
                <ModalFull onClose={ () => setOpenEdit(false) }
                    disabled={ !itemName || !price }
                    title="Edit item"
                    onSave={ updateItem }
                >
                    <Block>
                        <KeyValue value={ itemName }
                            label="Name"
                            onChange={ (e) => setItemName(e.target.value) }
                        />
                    </Block>

                    <Block>
                        <KeyValue value={ price }
                            label="Price"
                            onChange={ (e) => setPrice(e.target.value) }
                            type="number"
                        />
                    </Block>

                    <Block>
                        <Textarea value={ description }
                            placeholder="Description"
                            onChange={ (e) => setDescription(e.target.value) }
                        />
                    </Block>
            </ModalFull> }

            { openHide &&
                <Modal onClose={ () => setOpenHide(false) }
                    title={ item.hidden ? 'Show item?' : 'Hide item?'}
                >
                    <Block center bold
                        onClick={ hideItem }
                    >
                        { item.hidden ? 'Show' : 'Hide'}
                    </Block>
                </Modal>
            }

            { openDelete &&
                <Modal onClose={ () => setOpenDelete(false) }
                    title='Delete item?'
                >
                    <Block center bold red
                        onClick={ deleteItem }
                    >
                        Delete
                    </Block>
                </Modal>
            }
        </Root>
    )
}

export default Item;

const Root = styled.div`
    margin: 0 24px 24px;
    background: ${ ({ theme }) => theme.content };
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

const Name = styled(Text)`
    margin-bottom: 4px;
`;

const Description = styled(Text)`
    margin-bottom: 4px;
`;

const Left = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 40px);
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;

`;

const ImgContainer = styled.div`
    position: relative;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`;
