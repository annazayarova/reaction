import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactComponent as AddIcon } from '../img/add.svg';
import Block from './common/Block';
import Modal from './common/Modal';
import NewCategoryModal from './AddNewCategory';
import AddNewItemModal from './AddNewItem';

const AddButton = ({
    className,
    categories
}) => {
    const { t, i18n } = useTranslation();

    const [ open, setOpen ] = useState(false);
    const [ openNewCategory, setOpenNewCategory ] = useState(false);
    const [ openNewItem, setOpenNewItem ] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleOpenNewCategory = () => {
        setOpen(false);
        setOpenNewCategory(true);
    }

    const handleOpenNewItem = () => {
        setOpen(false);
        setOpenNewItem(true);
    }

    return (
        <Root className={ className }>
            <StyledAddIcon onClick={ handleClick }/>

            { open &&
                <Modal open={ open }
                    title={ t('Create') }
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                        onClick={ handleOpenNewCategory }
                    >
                        { t('Category') }
                    </Block>

                        <Block center
                            onClick={ handleOpenNewItem }
                            disabled={ categories.length === 0 }
                        >
                            { t('Item') }
                        </Block>
                </Modal>
            }

            { openNewCategory &&
                <NewCategoryModal open={ openNewCategory }
                    onClose={ () => setOpenNewCategory(false) }
                />
            }

            { openNewItem &&
                <AddNewItemModal onClose={ () => setOpenNewItem(false) }
                    categories={ categories }
                />
            }
        </Root>
    );
}

export default AddButton;

const Root = styled.div`
    align-items: center;
    display: flex;
    height: 64px;
    justify-content: center;
    width: 64px;
`;

const StyledAddIcon = styled(AddIcon)`
    cursor: pointer;
    width: 24px;
    height: 24px;

    &:last-of-type {
        fill: ${ ({ theme }) => theme.text }
    }
`;
