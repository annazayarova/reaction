import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as OrderIcon } from '../img/order.svg';
import Text from '../components/common/Text';

const OrderButton = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Root>
        <Icon onClick={ () => setOpen(true) }>
            <StyledText medium>
                1
            </StyledText>
        </Icon>
    </Root>
    );
}

export default OrderButton;

const Root  = styled.div`
    cursor: pointer;
    width: 64px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledText  = styled(Text)`
    color: ${ ({ theme }) => theme.text };
`;

const Icon  = styled.div`
    align-items: center;
    background-color: ${ ({ theme }) => theme.border };
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    min-width: 32px;
    padding: 0 4px;
`;



