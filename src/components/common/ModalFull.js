import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";
import { useTranslation } from 'react-i18next';

import Button from '../common/Button';
import Title from '../common/Title';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

const JSX_MODAL = (props) => {
    const { t, i18n } = useTranslation();

    const { children,
        label = "Update",
        onClose,
        onSave,
        open,
        disabled,
        title 
    } = props;

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

                <Content>
                    { children }

                    <Block />
                </Content>
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
    border-radius: 12px 12px 0 0;
`;

const Block  = styled.div`
    width: 100%; 
    height: 56px;
    background-color: ${ ({ theme }) => theme.content };
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
    bottom: 0;
    left: 0;
    padding-top: 24px;
    position: fixed;
    right: 0;
    top: 0;
    transition: ${ ({ theme }) => theme.transition };
    width: 100vw;
    z-index: 3;
`;

const Root  = styled.div`
    background-color: ${ ({ theme }) => theme.content };
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 100%;
    position: relative;
`;

const Content  = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const StyledTitle  = styled(Title)`
    text-align: center;
`;
