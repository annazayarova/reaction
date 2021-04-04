import { withRouter } from 'react-router';
import db from '../services/firebase';
import React, { useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Title from '../components/common/Title';
import Text from '../components/common/Text';
import RadioInput from '../components/common/RadioInput';

const SignUp = () => {
    const YEARLY_PRICE = 'price_1INEXaFEWEsMSzk35fiLTnXN';
    const MONTHLY_PRICE = 'price_1INzzXFEWEsMSzk35Ckw93Nf';

    const [ price, setPrice ] = useState(YEARLY_PRICE);
    const [ displayName, setDisplayName ] = useState('');

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const handleSignUp = async event => {
        event.preventDefault();

        setLoading(true);

        const { email, password } = event.target.elements;
        try {
            const { user } = await db
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);

            if (user) {
                const uid = db.auth().currentUser.uid;
                const userDocRef = db.firestore().collection('users').doc(uid);

                userDocRef
                .set({
                    displayName: displayName
                })

                const checkoutRef = await userDocRef
                        .collection('checkout_sessions')
                        .add({
                            price: price,
                            success_url: `${ window.location.origin }/${ uid }`,
                            cancel_url: `${ window.location.origin }/signup`,
                        });
                        // Wait for the CheckoutSession to get attached by the extension
                        checkoutRef.onSnapshot(async (snap) => {
                            const { error, sessionId } = snap.data();
                            if (error) {
                                setError(error.message);
                            }
                            if (sessionId) {
                              // We have a session, let's redirect to Checkout
                              // Init Stripe
                                const stripe = await loadStripe('pk_test_51I81KKFEWEsMSzk3yWka7l1hRyXyeyOVUHYkkSdHx8v9r6D7L8RYBYKlklNrLE13x6tIKB16qzDgvJabS30lVtwl001eRozpGn');
                                stripe.redirectToCheckout({ sessionId });
                            }
                        });
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <>
        <Root>
            <StyledTitle>
                Subscribe to create menu
            </StyledTitle>

            <form onSubmit={ handleSignUp }>
                <StyledInput autoFocus
                    name="displayName"
                    type="text"
                    placeholder="Business name"
                    notTransparent
                    value={ displayName }
                    onChange={ (e) => setDisplayName(e.target.value) }
                />

                <StyledInput name="email"
                    type="email"
                    placeholder="Email"
                    notTransparent
                />

                <StyledInput name="password"
                    type="password"
                    placeholder="Password"
                    notTransparent
                />

                <Radios>
                    <StyledRadioInput label="200 euros/yearly"
                        value={ YEARLY_PRICE }
                        onChange = { event => setPrice(event.target.value) }
                        checked={ price === YEARLY_PRICE }
                    />

                    <StyledRadioInput label="20 euros/monthly"
                        value={ MONTHLY_PRICE }
                        onChange={ event => setPrice(event.target.value) }
                        checked={ price === MONTHLY_PRICE }
                    />
                </Radios>

                <Error small red>{ error }</Error>

                <Button label={ loading ? "Processing..." : "Subscribe" }
                    type="submit"
                    notTransparent
                    loading={ loading }
                />
            </form>

            <StyledText grey>Already subscribed? <StyledLink to="/signin">Login</StyledLink> to continue</StyledText>

            <StyledText small grey>100% secure payment via Stripe</StyledText>
        </Root>
        </>
    );
};

export default withRouter(SignUp);

const Error = styled(Text)`
    margin-bottom: 12px;
    float: right;
`;

const StyledLink = styled(Link)`
    color: ${ ({ theme }) => theme.primary };
    text-decoration: underline;
    font-family: bold;
`;

const StyledInput = styled(Input)`
    margin-bottom: 24px;
`;

const StyledRadioInput = styled(RadioInput)`
    margin-bottom: 12px;
`;

const Radios = styled.div`
    margin-bottom: 24px;
`;

const StyledText = styled(Text)`
    margin-top: 24px;
    text-align: center;
    width: 100%;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 16px;
`;

const Root = styled.div`
    display: flex;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    min-height: 100%;
    align-items: center;
    flex-direction: column;

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        margin: 0 auto;
        width: 80%;
    }
`;
