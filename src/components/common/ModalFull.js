import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Button from '../common/Button';
import Title from '../common/Title';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

const JSX_MODAL = ({
    children,
    label = 'Update',
    onClose,
    onSave,
    open,
    disabled,
    title
}) => {

    useLockBodyScroll();
    
    const ref = useRef();

    const handleClick = (event) => {
        if (ref.current.contains(event.target)) {
            event.stopPropagation();

            return;
        }

        onClose();
    };

    return (
        <Window onClick={ handleClick }>
            <Root open={ open }
                ref={ ref }
            >
                <Header>
                    <Close label="Cancel"
                        onClick={ onClose }
                        regular
                    />

                    <StyledTitle>
                        { title }
                    </StyledTitle>

                    <Done label={ label }
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
    background-color: ${ ({ theme }) => theme.body };
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 16px 0;
    position: relative;
`;

const Close  = styled(Button)`
    position: absolute;
    left: 20px;
`;


const Done  = styled(Button)`
    position: absolute;
    right: 20px;
`;

const Window  = styled.div`
    background-color: ${ ({ theme }) => theme.overlay };
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    transition: ${ ({ theme }) => theme.transition };
    z-index: 3;
    padding-top: 24px;
`;

const Root  = styled.div`
    background-color: ${ ({ theme }) => theme.content };
    border-radius: 8px 8px 0 0;
    width: 100%;
    min-height: 100%;
    position: relative;
    overflow: auto;
`;

const StyledTitle  = styled(Title)`
    text-align: center;
`;
