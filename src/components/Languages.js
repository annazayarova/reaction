import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Block from './common/Block';
import Link from './common/Link';
import Text from './common/Text';

import { ReactComponent as ActiveIcon } from '../img/checked.svg';
import { ReactComponent as GreekFlag } from '../img/greece.svg';
import { ReactComponent as UKFlag } from '../img/united-kingdom.svg';

const Languages = ({
    className,
    open,
    onToggle,
    onClose
}) => {
    const initialLanguageActive = window.localStorage.getItem('activeLanguage') || 'english';

    const [ activeLanguage, setActiveLanguage ] = useState(initialLanguageActive);

    const { t, i18n } = useTranslation();

	const changeLanguage = lng => {
        i18n.changeLanguage(lng);

        setActiveLanguage(lng);
    };

    const languages = [ {
        name: 'english',
        action: () => { changeLanguage('english'); onClose() }
    }, {
        name: 'greek',
        action: () => { changeLanguage('greek'); onClose() }
    } ];

    useEffect(() => {
        window.localStorage.setItem('activeLanguage', activeLanguage)
    }, [activeLanguage]);

    return (
        <Root className={ className }>
            <LanguageLink>
                <StyledLink onClick={ onToggle }
                    text={ open ? t('Back') : activeLanguage }
                />

                { activeLanguage === 'english' ? <StyledUKFlag /> : <StyledGreekFlag /> }
            </LanguageLink>

            <List open={ open }>
                { languages.map(language =>
                    <StyledBlock onClick={ language.action }
                        key={ language.name }
                    >
                        <StyledText activeLanguage={ activeLanguage === language.name }>
                            { language.name }
                        </StyledText>

                    { activeLanguage === language.name && <StyledActiveIcon /> }
                    </StyledBlock>
                )}
            </List>
        </Root>
    );
}

export default Languages;

const StyledActiveIcon = styled(ActiveIcon)`
    width: 20px;
    height: 20px;

    path {
        &:last-of-type {
            fill: ${ ({ theme }) => theme.text }
        }
    }
`;

const LanguageLink = styled.div`
    align-items: center;
    display: flex;
    padding: 24px;
`;

const StyledUKFlag = styled(UKFlag)`
    width: 20px;
    height: auto;
`;

const StyledGreekFlag = styled(GreekFlag)`
    width: 20px;
    height: auto;
`;

const Root = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
`;

const StyledLink = styled(Link)`
    text-transform: capitalize;
    margin-right: 12px;
`;

const StyledText = styled(Text)`
    text-transform: capitalize;
    font-family: ${ ({ activeLanguage }) => activeLanguage && 'bold' }
`;

const List = styled.div`
    background-color: ${ ({ theme }) => theme.body };
    display: ${ ({ open }) => open ? 'block' : 'none' };
    min-height: 100vh;
    width: 100%;
`;

const StyledBlock = styled(Block)`
    width: 100%;
`;
