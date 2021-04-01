import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DoneIcon } from '../img/done.svg';
import { ReactComponent as AddIcon } from '../img/add.svg';

const AddToOrderButton = () => {
    const [added, setAdded] = useState(false);


    const handleAdd = (e) => {
        e.stopPropagation();
        setAdded(!added);
    };

    return (
        <Root onClick={ handleAdd }
            added={ added }
        >
            { added ? <StyledDoneIcon /> : <StyledAddIcon /> }
        </Root>
    )
}

export default AddToOrderButton;

const Root = styled.div`
    align-items: center;
    border-left: 1px solid ${ ({ theme }) => theme.body };
    color: ${ ({ theme }) => theme.text };
    display: flex;
    font-family: regular;
    font-size: 20px;
    justify-content: center;
    text-transform: uppercase;
    width: 48px;
    height: 48px;
`;

const StyledDoneIcon = styled(DoneIcon)`
    width: 24px;
    height: 24px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text };
        }
    }
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
