import React, { useState, useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';

import { ReactComponent as MoreIcon} from '../img/more.svg';
import { ReactComponent as VeganIcon } from '../img/vegan.svg';

import { AuthContext } from '../Auth';
import { resizeImage } from './common/ImageUpload';
import AddToOrderButton from './AddToOrderButton';
import Block from './common/Block';
import db from '../config/firebase';
import ImageUpload from './common/ImageUpload';
import KeyValue from './common/KeyValue';
import LoadingSpinner from './common/Loadings/LoadingSpinner';
import Modal from './common/Modal';
import ModalFull from './common/ModalFull';
import Text from './common/Text';
import Textarea from './common/Textarea';
import Title from './common/Title';
import Toggle from './common/Toggle';

const Item = ({
    item,
    hiddenCategory,
    userId,
    full = false,
    onIncrement,
    onDecrement
}) => {
    const { t, i18n } = useTranslation();

    const theme = useTheme();

    const [ itemName, setItemName ] = useState(item.name || '')
    const [ price, setPrice ] = useState(item.price || '')
    const [ description, setDescription ] = useState(item.description || '')
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openHide, setOpenHide ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ expanded, setExpanded ] = useState(false);
    const [ vegan, setVegan ] = useState(item.vegan || false);
    const [ image, setImage ] = useState(item.imageUrl ? item.imageUrl : null);
    const [ imageUrl, setImageUrl ] = useState('');
    const [ progress, setProgress ] = useState(false);
    const [ imageIsUploading, setImageIsUploading ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const hideItem = () => {
        docRef
        .doc(item.id).set({
            hidden: !item.hidden
        }, { merge: true })

        setOpenHide(false);
    };

    const deleteItem = () => {
        docRef
        .doc(item.id)
        .delete()

        setOpenDelete(false);
    };

    const handleMoreClick = (e) => {
        e.stopPropagation();
        setOpen(true)
    }

    const handleImageChange = async (event) => {
        setImageIsUploading(true)
        try {
            const resizedImage = await resizeImage(event.target.files[0]);
            setImage(resizedImage);
            setImageIsUploading(false);
        } catch (err) {
          console.log(err);
        }
      }; 

    const handleImageDelete = () => {
        setImage(null);
    };

    const docRef = currentUser && db.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('items');

    const updateItem = async () => {
        setProgress(true);

        const storageRef = db.storage().ref(`images/${ currentUser.uid }/`);

        const imageRef = image && storageRef.child(`${ item.id }.JPEG`);

        let url = '';

        if (image) {
            try { 
                await imageRef.put(image)
                .then(() => imageRef.getDownloadURL())
                .then((img) => url = img)
            } 
            catch(error) { alert(error) }
        } 

        if (!image && item.imageUrl) {
            const ref = storageRef.child(`${ item.id }.JPEG`);

            ref.delete()
        }

        docRef
        .doc(item.id).set({
            description: description.trim(),
            imageUrl: url || null,
            name: itemName.trim(),
            price: price.trim(),
            vegan
        }, { merge: true })

        setProgress(false);

        setOpenEdit(false);
    };

    if ((item.hidden === true || hiddenCategory) && currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root onClick={ () => setExpanded(!expanded) }
            full={ full }
        >
            <ImgContainer>
                { item.imageUrl && <img src={ item.imageUrl } /> }
            </ImgContainer>

            <Content>
                <Name bold
                    disabled={ !!item.hidden || hiddenCategory }
                    expanded={ expanded }
                >
                    { item.name }
                </Name>

                { item.description &&
                    <Description
                        small
                        expanded={ expanded }
                        disabled={ !!item.hidden || hiddenCategory }
                    >
                        { item.description }
                    </Description>
                }
            </Content>

            <Bottom>
                    <Left>
                        <Price small
                            disabled={ !!item.hidden || hiddenCategory }
                        >€ { Number(item.price).toFixed(2) }</Price>

                        { item.vegan && <Icon disabled={ !!item.hidden || hiddenCategory }><StyledVeganIcon /></Icon> }
                    </Left>

                    <Right>
                        <AddToOrderButton onIncrement={ onIncrement }
                            onDecrement={ onDecrement }
                        />

                        { currentUser && currentUser.uid === userId &&
                            <More>
                                <StyledMoreIcon onClick={ handleMoreClick } />
                            </More>
                        }
                    </Right>
            </Bottom>

            { open &&
                <Modal title={ t("Item") }
                    onClose={ () => setOpen(false) }
                >
                    <Block center
                        onClick={ () => (setOpenEdit(true), setOpen(false)) }
                    >
                        { t("Edit") }
                    </Block>

                    <Block center
                        onClick={ () => (setOpenHide(true), setOpen(false)) }
                    >
                        { item.hidden === true ? t('Show') : t('Hide') }
                    </Block>

                    <Block center red
                        onClick={ () => (setOpenDelete(true), setOpen(false)) }
                    >
                        { t("Delete") }
                    </Block>
                </Modal>
            }

            { openEdit &&
                <ModalFull onClose={ () => setOpenEdit(false) }
                    disabled={ !itemName || !price }
                    title={ t("Edit item") }
                    onSave={ updateItem }
                    label={ progress ? <LoadingSpinner color={ theme.primary } size="24px" /> : t("Save") }
                >
                    <Block>
                        <ImageUpload onImageChange={ handleImageChange }
                            image={ image }
                            onDelete={ handleImageDelete }
                            inProgress={ imageIsUploading }
                        />
                    </Block>

                    <Block>
                        <KeyValue value={ itemName }
                            label={ t("Title") }
                            onChange={ (e) => setItemName(e.target.value) }
                            required
                        />
                    </Block>

                    <Block>
                        <KeyValue value={ price.replace(/,/g, '.') }
                            label={ t("Price") }
                            onChange={ (e) => setPrice(e.target.value) }
                            type="number"
                            placeholder="0.00"
                            required
                        />
                    </Block>

                    <StyledBlock>
                        <Text bold>{ t("Description") }</Text>

                        <Textarea value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                            placeholder={ t("Write description here") }
                        />
                    </StyledBlock>

                    <Block>
                        <Text bold>Vegetarian or Vegan</Text>

                        <Toggle checked={ vegan }
                            onChange={ () => setVegan(!vegan) }
                        />
                </Block>
            </ModalFull> }

            { openHide &&
                <Modal onClose={ () => setOpenHide(false) }
                    title={ item.hidden ? t('Show item?') : t('Hide item?') }
                >
                    <Block center bold
                        onClick={ hideItem }
                    >
                        { item.hidden ? t('Show') : t('Hide')}
                    </Block>
                </Modal>
            }

            { openDelete &&
                <Modal onClose={ () => setOpenDelete(false) }
                    title={ t('Delete item?') }
                >
                    <Block center bold red
                        onClick={ deleteItem }
                    >
                        { t("Delete") }
                    </Block>
                </Modal>
            }
        </Root>
    )
}

export default Item;

const Root = styled.div`
    margin: ${ ({ full }) => !full && '0 24px 24px' };
    background: ${ ({ theme }) => theme.content };
    cursor: pointer;
`;

const Price = styled(Text)`
`;

const StyledBlock = styled(Block)`
    flex-direction: column;
    align-items: start;

    ${ Text } {
        margin-bottom: 12px;
    }
`;

const Name = styled(Title)`
    width: 100%;
`;

const Description = styled(Text)`
    margin-top: 8px;
    overflow: ${ ({ expanded }) => expanded ? 'auto' : 'hidden' };
    text-overflow: ${ ({ expanded }) => expanded ? 'initial' : 'ellipsis' };
    width: 100%;

    ${ ({ expanded }) => !expanded && `
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    `}
`;

const Bottom = styled.div`
    align-items: center;
    border-top: 1px solid ${ ({ theme }) => theme.body };
    display: flex;
    height: 48px;
    justify-content: space-between;
    margin-top: 8px;
`;

const Left = styled.div`
    align-items: center;
    display: flex;
    margin-left: 16px;
`;

const Right = styled.div`
    align-items: center;
    display: flex;
`;

const More = styled.div`
    align-items: center;
    border-left: 1px solid ${ ({ theme }) => theme.body };
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    width: 48px;
`;

const StyledMoreIcon = styled(MoreIcon)`
    width: 20px;
    height: 20px;
    transform: rotate(90deg);

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const Content = styled.div`
    padding: 16px 16px 8px;
    position: relative;
`;

const ImgContainer = styled.div`
    position: relative;
    img { display: block; }
`;

const StyledVeganIcon = styled(VeganIcon)`
    fill: ${ ({ theme }) => theme.green };
    height: 24px;
    width: 24px;
`;

const Icon = styled.div`
    height: 24px;
    margin-left: 16px;
    opacity: ${ ({ disabled }) => disabled ? 0.6 : 1 };
    width: 24px;
`;
