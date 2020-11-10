import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Title from '../common/Title';

const JSX_MODAL = ({
    children,
    onClose,
    open,
    title
}) => {

    const ref = useRef();

    const handleClick = (event) => {
        if (ref.current.contains(event.target)) {
            event.stopPropagation();

            return;
        }

        onClose();
    };

    return (
        <Window onClick={ handleClick }
            open={ open }
        >
            <Root ref={ ref }
                open={ open }
            >
                <Header>
                    <StyledTitle>
                        { title }
                    </StyledTitle>
                </Header>

                { children }
            </Root>
        </Window>
    );
}

function Modal(props) {
    return ReactDOM.createPortal(<JSX_MODAL { ...props } />, document.querySelector("#modal"));
};

export default Modal;

const Header  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
`;

const Window  = styled.div`
    align-items: flex-start;
    background-color: ${ ({ theme }) => theme.overlay };
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    padding-top: 64px;
    position: fixed;
    top: 0;
    width: 100vw;
    opacity: ${ ({ open }) => (open ? '1' : '0') };
    transition: ${ ({ theme }) => theme.transition };
    visibility: ${ ({ open }) => (open ? 'visible' : 'hidden') };
    z-index: 3;
`;

const Root  = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    height: auto;
    width: 80%;
    border-radius: 8px;
    position: relative;
    transform: ${ ({ open }) => (open ? 'scale(1)' : 'scale(0.8)') };
    transition: ${ ({ theme }) => theme.transition };
`;

const StyledTitle  = styled(Title)`
    text-align: center;
`;
