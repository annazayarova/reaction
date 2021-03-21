import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../Auth';
import AddButton from './AddButton';
import ProfileButton from './ProfileButton';
import Link from '../components/common/Link';
import firebase from 'firebase';

const HeaderOfUser = ({
    categories,
    businessName,
    userId,
}) => {
    const [ loading, setLoading ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleGoToSubscription = async () => {
        setLoading(true);

        const functionRef = firebase
        .app()
        .functions('europe-west6')
        .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

        const { data } = await functionRef({ returnUrl: `${ window.location.origin }/signin` });

        window.location.assign(data.url);
        setLoading(false);
    }

    if (currentUser?.uid !== userId) {
        return null;
    }

    return (
        <Root>
            <ProfileButton businessName={ businessName } />

            <Link text={ loading ? "Processing..." : "Go to subscriptions" }
                onClick={ handleGoToSubscription }
            />

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
    position: relative;
    width: 100%;
`;

const StyledAddButton = styled(AddButton)`
`;
