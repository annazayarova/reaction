import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Title from '../common/Title';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';


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

    useLockBodyScroll();

    return (
        <Window onClick={ handleClick }>
            <Root ref={ ref }>
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
    transition: ${ ({ theme }) => theme.transition };
    z-index: 3;
`;

const Root  = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    height: auto;
    width: 80%;
    border-radius: 8px;
    position: relative;
    transition: ${ ({ theme }) => theme.transition };
`;

const StyledTitle  = styled(Title)`
    text-align: center;
`;
