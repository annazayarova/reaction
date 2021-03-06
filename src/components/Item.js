import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as MoreIcon} from '../img/more.svg';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import Button from './common/Button';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Toggle from './common/Toggle';
import Textarea from './common/Textarea';

import img from '../img/2.jpg';

const Item = ({
    item,
    hiddenCategory,
    userId
}) => {
    const [ itemName, setItemName ] = useState(item.name || '')
    const [ price, setPrice ] = useState(item.price || '')
    const [ description, setDescription ] = useState(item.description || '')
    const [ hiddenItem, setHiddenItem ] = useState(item.hidden || '');
    const [ open, setOpen ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const updateItem = () => {
        db.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('items')
        .doc(item.id).set({
            name: itemName,
            price: price,
            description: description,
            hidden: hiddenItem
        }, { merge: true })

        setOpen(false);
    };

    if ((hiddenItem || hiddenCategory) && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root>
            <ImgContainer>
                <img src={ img } alt="reaction" />
            </ImgContainer>

            <Content>
                <Left>
                    <Name bold
                        lineThrough={ hiddenItem || hiddenCategory }
                    >
                        { item.name }
                    </Name>

                    { item.description &&
                        <Description lineThrough={ hiddenItem || hiddenCategory }>
                            { item.description }
                        </Description>
                    }

                    <Text lineThrough={ hiddenItem || hiddenCategory }>
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
                <ModalFull disabled={ !Boolean(itemName) }
                    open={ open }
                    onClose={ () => setOpen(false) }
                    title="Edit item"
                    onSave={ updateItem }
                >
                    <Block>
                        <KeyValue hidden={ hiddenItem }
                            value={ itemName }
                            label="Name"
                            onChange={ (e) => setItemName(e.target.value) }
                        />
                    </Block>

                    <Block>
                        <KeyValue hidden={ hiddenItem }
                            value={ price }
                            label="Price"
                            onChange={ (e) => setPrice(e.target.value) }
                        />
                    </Block>

                    <Block>
                        <Textarea value={ description }
                            placeholder="Description"
                            onChange={ (e) => setDescription(e.target.value) }
                            hidden={ hiddenItem }
                        />
                    </Block>

                    <Block>
                        <Text>{ !hiddenItem ? 'Hide item' : 'Show item' } </Text>

                        <Toggle checked={ hiddenItem }
                            onChange={ () => setHiddenItem(!hiddenItem) }
                            label={ !hiddenItem ? 'Hide item' : 'Show item' }
                        />
                    </Block>

                    <Block>
                        <Button regular
                            label="Delete item"
                            onClick={ () => db.firestore()
                                .collection('users')
                                .doc(currentUser.uid)
                                .collection('items')
                                .doc(item.id)
                                .delete()
                            }
                            red
                        />
                    </Block>
                </ModalFull>
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
