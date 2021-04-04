import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as MoreIcon} from '../img/more.svg';
import { ReactComponent as VeganIcon } from '../img/vegan.svg';

import { AuthContext } from '../Auth';
import AddToOrderButton from './AddToOrderButton';
import Block from './common/Block';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';
import Modal from './common/Modal';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Textarea from './common/Textarea';
import Toggle from './common/Toggle';

const Item = ({
    item,
    hiddenCategory,
    userId,
    full = false
}) => {
    const [ itemName, setItemName ] = useState(item.name || '')
    const [ price, setPrice ] = useState(item.price || '')
    const [ description, setDescription ] = useState(item.description || '')
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openHide, setOpenHide ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ expanded, setExpanded ] = useState(false);
    const [ vegan, setVegan ] = useState(item.vegan || false);

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
            description: description.trim(),
            vegan
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

    const handleMoreClick = (e) => {
        e.stopPropagation();
        setOpen(true)
    }
    if ((item.hidden === true || hiddenCategory) && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root onClick={ () => setExpanded(!expanded) }
            full={ full }
        >
            <Content>
                    <Name bold
                        disabled={ !!item.hidden || hiddenCategory }
                        expanded={ expanded }
                    >
                        { item.name }
                    </Name>

                    { item.description &&
                        <Description grey
                            small
                            expanded={ expanded }
                            disabled={ !!item.hidden || hiddenCategory }
                        >
                            { item.description }
                        </Description>
                    }
            </Content>

            <Bottom>
                <Left>
                    <Price disabled={ !!item.hidden || hiddenCategory }
                        small
                        grey={ !(item.hidden || hiddenCategory) }
                    >
                        € { Number(item.price).toFixed(2) }
                    </Price>

                    { item.vegan && <Icon><StyledVeganIcon /></Icon> }
                </Left>

                <Right>
                    <AddToOrderButton />

                    { currentUser && currentUser.uid === userId &&
                        <More>
                            <StyledMoreIcon onClick={ handleMoreClick } />
                        </More>
                    }
                </Right>
            </Bottom>

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

                    <Block center red
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

                    <StyledBlock>
                        <Text bold>Description</Text>

                        <Textarea value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                        />
                    </StyledBlock>

                    <Block>
                        <Text bold>Vegetarian or Vegan</Text>

                        <Toggle checked={ vegan }
                            onChange={ () => setVegan(!vegan) }
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
    margin: ${ ({ full }) => !full && '0 24px 24px' };
    background: ${ ({ theme }) => theme.content };
    cursor: pointer;
`;

const StyledBlock = styled(Block)`
    flex-direction: column;
    align-items: flex-start;

    ${ Text } {
        margin-bottom: 12px;
    }
`;

const Price = styled(Text)`
    margin-right: 16px;
    white-space: nowrap;
`;

const Name = styled(Text)`
    margin-bottom: 4px;
    white-space: ${ ({ expanded }) => expanded ? 'wrap' : 'nowrap' };
    overflow: ${ ({ expanded }) => expanded ? 'auto' : 'hidden' };
    text-overflow: ${ ({ expanded }) => expanded ? 'initial' : 'ellipsis' };
    width: 100%;
`;

const Description = styled(Text)`
    overflow: ${ ({ expanded }) => expanded ? 'auto' : 'hidden' };
    text-overflow: ${ ({ expanded }) => expanded ? 'initial' : 'ellipsis' };
    width: 100%;

    ${ ({ expanded }) => !expanded && `
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    `}
`;

const ItemInfo = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Bottom = styled.div`
    align-items: center;
    background: ${ ({ theme }) => theme.content };
    border-top: 1px solid ${ ({ theme }) => theme.body };
    display: flex;
    height: 48px;
    justify-content: space-between;
`;

const Left = styled.div`
    align-items: center;
    display: flex;
    margin-left: 16px;
`;

const Right = styled.div`
    align-items: center;
    display: flex;
`;

const More = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-left: 1px solid ${ ({ theme }) => theme.body };
`;

const StyledMoreIcon = styled(MoreIcon)`
    width: 20px;
    height: 20px;
    transform: rotate(90deg);

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const Content = styled.div`
    padding: 16px;
    position: relative;

`;

const ImgContainer = styled.div`
    position: relative;
    padding-left: 16px;
    width: 40%;
    display: ${ ({ expanded }) => expanded ? 'none' : 'block' };
`;

const StyledVeganIcon = styled(VeganIcon)`
    fill: ${ ({ theme }) => theme.green };
`;

const Icon = styled.div`
    height: 24px;
    width: 24px;
`;
