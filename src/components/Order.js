import React, { useState } from 'react';
import styled from 'styled-components';

import Slider from '../components/common/Slider';
import Title from '../components/common/Title';
import Text from '../components/common/Text';

const Order = ({
    counter,
    items
}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const orderedItems = items;

    return (
        <Root>
           <Button onClick={ () => setOpen(true) }>
                <span>View order</span>
                <Counter>€ { Number(56).toFixed(2) }</Counter>
            </Button>

            <Slider open={ open }
                right
                onClose={ handleClose }
                full
                title="Your order"
            >
                <List>
                    { orderedItems.map(item => 
                        <Item>
                            <Name medium>
                                { item.name }
                            </Name> 

                            <Price>
                                € { Number(item.price).toFixed(2) }
                            </Price> 
                        </Item>
                    ) }
                </List>
            </Slider> 
        </Root>
    );
};

export default Order;

const Root = styled.div`
    position: fixed;
    bottom: 24px;
    z-index: 2;
    width: calc(100% - 48px);
    margin: 0 auto;
    left: 24px;
`;

const Counter = styled.span`
    color: ${ ({ theme }) => theme.content };
    margin-left: 8px;
    font-family: bold;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    background: ${ ({ theme }) => theme.text };
    border-radius: 32px;
    border: none;
    cursor: pointer;
    color: ${ ({ theme }) => theme.content };
    font-family: bold;
    font-size: 16px;
    height: 48px;
    margin: 0;
    outline: none;
    position: relative;
    width: 100%;

    &:active {
        opacity: 0.9;
    }

    &:hover {
        opacity: 0.9;
    }
`;

const List = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const Name = styled(Text)`
    margin-right: 32px;
    max-width: 60%;
`;

const Price = styled(Text)`
    white-space: nowrap;
`;


