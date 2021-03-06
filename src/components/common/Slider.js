import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

import Title from '../common/Title';

import { ReactComponent as CloseIcon } from '../../img/close.svg';

const JSX_MODAL = ({
    children,
    onClose,
    open,
    right,
    title,
    full
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
            right={ right }
        >
            <Root ref={ ref }
                open={ open }
                right={ right }
                full={ full }
            >
                <Header>
                    <Title>
                        { title && title }
                    </Title>

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
    justify-content: space-between;
    padding: 0 24px;
    width: 100%;
`;

const StyledCloseIcon = styled(CloseIcon)`
    width: 20px;
    height: 20px;
    z-index: 11;
    cursor: pointer;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const Window  = styled.div`
    align-items: flex-start;
    background-color: ${ ({ theme }) => theme.overlay };
    display: flex;
    height: 100vh;
    justify-content: ${ ({ right }) => right ? 'flex-end' : 'flex-start' };
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
    width: 360px;
    position: relative;
    transform: ${ ({ open, right }) => (open ? 'translateX(0)' : right ? 'translateX(100%)' : 'translateX(-100%)') };
    transition: ${ ({ theme }) => theme.transition };
    right: 0;

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        width: ${ ({ full }) => full ? '100%' : '80%' };
    }
`;
