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
    background: ${ ({ added, theme }) => added ? theme.primary : '' };
    border-radius: 50%;
    border : 1px solid ${ ({ added, theme }) => added ? theme.primary : theme.border };
    color: ${ ({ theme }) => theme.text };
    display: flex;
    font-family: regular;
    justify-content: center;
    text-transform: uppercase;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
`;

const StyledDoneIcon = styled(DoneIcon)`
    width: 24px;
    height: 24px;

    path {
        &:last-of-type {
            fill: white;
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
