import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';

import { ReactComponent as SearchIcon } from '../../img/search.svg';
import { ReactComponent as CloseIcon } from '../../img/close.svg';

const Search = ({
    onChange,
    reset,
    value
}) => {
    const [open, setOpen ] = useState(false);

    const handleClose = () => {
        setOpen(false);
        reset();
    }

    return (
        <Root>
            <Icon onClick={ () => setOpen(true) }>
                <StyledSearchIcon />
            </Icon>

            { open &&
                <InputWrapper>
                    <Icon>
                        <StyledSearchIcon />
                    </Icon>

                    <Input value={ value }
                        placeholder="Search items"
                        onChange={ onChange }
                        autoFocus
                        width='calc(100% - 64px - 64px)'
                    />

                    <Close>
                        <StyledCloseIcon onClick={ handleClose } />
                    </Close>
                </InputWrapper>
            }

        </Root>
    );
}

export default Search;

const StyledSearchIcon  = styled(SearchIcon)`
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

const Root  = styled.div`
    border-right: 1px solid ${ ({ theme }) => theme.border };
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
