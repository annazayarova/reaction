import React from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Button from '../common/Button';
import Title from '../common/Title';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

const JSX_MODAL = ({
    children,
    onClose,
    onSave,
    open,
    disabled,
    title
}) => {

    useLockBodyScroll();

    return (
        <Window open={ open }>
            <Root open={ open }>
                <Header>
                    <Close label="Cancel"
                        onClick={ onClose }
                        regular
                    />

                    <StyledTitle>
                        { title }
                    </StyledTitle>

                    <Done label="Save"
                        onClick={ onSave }
                        disabled={ disabled }
                    />
                </Header>

                { children }
            </Root>
        </Window>
    );
}

function ModalFull(props) {
    return ReactDOM.createPortal(<JSX_MODAL { ...props } />, document.querySelector("#modal"));
};

export default ModalFull;

const Header  = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 16px;
    position: relative;
`;

const Close  = styled(Button)`
    position: absolute;
    left: 16px;
`;


const Done  = styled(Button)`
    position: absolute;
    right: 16px;
`;

const Window  = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    transition: ${ ({ theme }) => theme.transition };
    z-index: 3;
`;

const Root  = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;
    overflow: auto;
`;

const StyledTitle  = styled(Title)`
    text-align: center;
`;
