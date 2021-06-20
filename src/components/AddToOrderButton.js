import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as AddIcon } from '../img/add.svg';
import { ReactComponent as RemoveIcon } from '../img/remove.svg';
import Text from '../components/common/Text';

const AddToOrderButton = ({
    count

}) => {

    return (
        <Root>
            <IncButton>
                <StyledAddIcon  />
            </IncButton>        
        </Root>
    )
}

export default AddToOrderButton;

const Root = styled.div`
    align-items: center;
    color: ${ ({ theme }) => theme.text };
    display: flex;
`;

const IncButton = styled.div`
    align-items: center;
    border-left: 1px solid ${ ({ theme }) => theme.body };
    display: flex;
    flex-shrink: 0;
    height: 48px;
    justify-content: center;
    width: 48px;

`;

const StyledAddIcon = styled(AddIcon)`
    width: 20px;
    height: 20px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text };
        }
    }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
    width: 20px;
    height: 20px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text };
        }
    }
`;
