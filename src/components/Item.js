import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as OrderIcon} from '../img/like.svg';
import { ReactComponent as OrderedIcon} from '../img/liked.svg';

import { AuthContext } from '../Auth';
import Block from './common/Block';
import Button from './common/Button';
import db from '../services/firebase';
import KeyValue from './common/KeyValue';
import Link from './common/Link';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Toggle from './common/Toggle';
import Textarea from './common/Textarea';

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
    const [ ordered, setOrdered ] = useState(false);

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
            <Content>
                <Left>
                    <Text bold
                        lineThrough={ hiddenItem || hiddenCategory }
                    >
                        { item.name }
                    </Text>

                    { item.description &&
                        <Description lineThrough={ hiddenItem || hiddenCategory }>
                            { item.description }
                        </Description>
                    }

                    { currentUser && currentUser.uid == userId &&
                        <Link text="Edit"
                                onClick={ () => setOpen(true) }
                        />
                    }
                </Left>

                <Right>
                    <Text lineThrough={ hiddenItem || hiddenCategory }>
                        € { item.price }
                    </Text>

                    <Order onClick={ () => setOrdered(!ordered) }>
                        <StyledOrderIcon ordered={ ordered }/>
                        <StyledOrderedIcon ordered={ ordered }/>
                    </Order>
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

const StyledOrderIcon= styled(OrderIcon)`
    display: ${ ({ ordered }) => ordered ? 'none' : 'block' };
    height: 16px;
    width: 16px;
    transition: all 150ms;
    fill: ${ ({ theme }) => theme.text };

`;

const StyledOrderedIcon= styled(OrderedIcon)`
    display: ${ ({ ordered }) => ordered ? 'block' : 'none' };
    height: 16px;
    width: 16px;
    transition: all 150ms;

    fill: ${ ({ theme }) => theme.red };
`;

const Order = styled.div`
    margin-top: 8px;
`;

const Root = styled.div`
    margin: 0 24px;
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
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;

`;

const Description = styled(Text)`
    margin-top: 8px;
`;
