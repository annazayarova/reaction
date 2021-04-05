import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import AddButton from './AddButton';
import ProfileButton from './ProfileButton';
import Link from '../components/common/Link';
import firebase from 'firebase';
import LoadingSpinner from './common/Loadings/LoadingSpinner';
import { color } from '../styles/theme';

const HeaderOfUser = ({
    categories,
    userId,
    onBusinessNameChange,
    businessName,
    businessNameError, 
    updateBusinessName
}) => {
    const [ loading, setLoading ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const user = currentUser?.uid === userId;

    const handleGoToSubscription = async () => {
        setLoading(true);

        const functionRef = firebase
        .app()
        .functions('europe-west6')
        .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

        const { data } = await functionRef({ returnUrl: `${ window.location.origin }/signin` });

        window.location.assign(data.url);
    }

    if (!user) {
        return null;
    }

    return (
        <Root>
            <ProfileButton  onBusinessNameChange={ onBusinessNameChange }
            businessName={ businessName }
            businessNameError={ businessNameError }
            updateBusinessName={ updateBusinessName }
        />

            { loading ? <LoadingSpinner color={ color.primary } />
                : <Link text="Go to subscriptions"
                    onClick={ handleGoToSubscription }
                />
            }

            <StyledAddButton categories={ categories } />
        </Root>
    );
}

export default HeaderOfUser;

const Root  = styled.div`
    align-items: center;
    background-color: ${ ({ theme }) => theme.content };
    display: flex;
    height: 64px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    transition: all 400ms ease;
`;

const StyledAddButton = styled(AddButton)`
`;
