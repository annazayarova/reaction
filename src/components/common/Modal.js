import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";
import { useTranslation } from 'react-i18next';

import Text from '../common/Text';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import Block from '../common/Block';

const JSX_MODAL = ({
    children,
    onClose,
    title
}) => {
    const { t, i18n } = useTranslation();

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
                { title && <Header>
                    <StyledTitle medium>
                        { title }
                    </StyledTitle>
                </Header>
                }
                    { children }

                    <Block onClick={ onClose }
                        center
                        noBorder
                    >
                        { t('Cancel') }
                    </Block>
            </Root>
        </Window>
    );
}

function Modal(props) {
    return ReactDOM.createPortal(<JSX_MODAL { ...props } />, document.querySelector("#modal"));
};

export default Modal;

const Header  = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    border-radius:12px 12px 0 0;
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
    background-color: ${ ({ theme }) => theme.content };
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: auto;
    height: auto;
    max-width: 360px;
    position: relative;
    transition: ${ ({ theme }) => theme.transition };
    width: 80%;
`;

const StyledTitle  = styled(Text)`
    text-align: center;
`;
