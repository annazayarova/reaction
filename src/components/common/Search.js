import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Caption from '../common/Caption';
import Input from '../common/Input';

import { ReactComponent as SearchIcon } from '../../img/search.svg';
import { ReactComponent as CleanIcon } from '../../img/clean.svg';

const Search = ({
    onChange,
    reset,
    value
}) => {
    const [open, setOpen ] = useState(false);

    const inputFocus = useRef(null);

    const handleClose = () => {
        setOpen(false);
        reset();
    }

    const handleClean = () => {
        inputFocus.current.focus();
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
                        ref={ inputFocus }
                    />

                    { value && <StyledCleanIcon onClick={ handleClean } /> }

                    <Caption onClick={ handleClose }>
                        Cancel
                    </Caption>
                </InputWrapper>
            }

        </Root>
    );
}

export default Search;

const StyledSearchIcon  = styled(SearchIcon)`
    width: 16px;
    height: 16px;

    path {
        fill: ${ ({ theme }) => theme.text }
    }
`;

const StyledCleanIcon  = styled(CleanIcon)`
    width: 20px;
    height: 20px;
    margin-right: 16px;

    circle {
        fill: ${ ({ theme }) => theme.placeholder }
    }
`;

const Root  = styled.div`

`;

const InputWrapper  = styled.div`
    align-items: center;
    background: ${ ({ theme }) => theme.body };
    display: flex;
    height: 100%;
    left: 0;
    padding: 0 24px 0 8px;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: space-between;
`;

const Icon  = styled.div`
    width: 64px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: center;
`;
