import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Title from '../common/Title';

import { ReactComponent as CloseIcon } from '../../img/simpleClose.svg';

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
                    <StyledCloseIcon onClick={ onClose } />
                </Header>

                { children }
            </Root>
        </Window>
    );
}

function Slider(props) {
    return ReactDOM.createPortal(< JSX_MODAL { ...props } />, document.querySelector("#modal"));
};

export default Slider;

const Header  = styled.div`
    align-items: center;
    border-bottom: 1px solid ${ ({ theme }) => theme.border };
    display: flex;
    height: 64px;
    justify-content: flex-end;
    padding: 0 24px;
    width: 100%;
`;

const StyledCloseIcon = styled(CloseIcon)`
    width: 16px;
    height: 16px;

    path {
        fill: ${ ({ theme }) => theme.text };
    }
`;

const Window  = styled.div`
    align-items: flex-start;
    background-color: ${ ({ theme }) => theme.overlay };
    display: flex;
    height: 100vh;
    justify-content: flex-start;
    left: 0;
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
    min-height: 100vh;
    width: calc(100% - 64px);
    position: relative;
    transform: ${ ({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)') };
    transition: ${ ({ theme }) => theme.transition };
`;

const StyledTitle  = styled(Title)`
`;
