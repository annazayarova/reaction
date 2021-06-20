import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ShareIcon } from '../../img/share-outline.svg';
import { ReactComponent as CloseIcon } from '../../img/close.svg';

const Share = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Root>
            <Icon onClick={ () => setOpen(true) }>
                <StyledShareIcon />
            </Icon>

            { open &&
                <InputWrapper>
                    <Icon>
                        <StyledShareIcon />
                    </Icon>

                    jk

                    <Close>
                        <StyledCloseIcon onClick={ handleClose } />
                    </Close>
                </InputWrapper>
            }
        </Root>
    );
}

export default Share;

const Root  = styled.div`
`;

const StyledShareIcon  = styled(ShareIcon)`
    width: 24px;
    height: 24px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const Close  = styled.div`
    width: 64px;
    height: 64px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledCloseIcon  = styled(CloseIcon)`
    width: 24px;
    height: 24px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
    }}
`;

const InputWrapper  = styled.div`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    display: flex;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: space-between;
`;

const Icon  = styled.div`
    cursor: pointer;
    width: 64px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: center;
`;
