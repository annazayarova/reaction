import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import db from '../services/firebase';
import Text from '../components/common/Text';
import { AuthContext } from '../Auth';

const Payment= () => {
    const [ products, setProducts ] = useState([]);

    const { currentUser } = useContext(AuthContext);

    const docRef = db.firestore().collection("products");

	useEffect(() => {
        docRef
        .where('active', '==', true)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                console.log(doc.id, ' => ', doc.data());
                const priceSnap = await doc.ref.collection('prices').get();
                priceSnap.docs.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                });
            });
        });
    }, []);

    const handleCheckout = async (e) => {
        const docRef = await db.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .collection('checkout_sessions')
            .add({
                price: 'price_1INEXaFEWEsMSzk35fiLTnXN',
                success_url: `${ window.location.origin }/${ currentUser.uid }`,
                cancel_url: `${ window.location.origin }/payment`,
            });
            // Wait for the CheckoutSession to get attached by the extension
            docRef.onSnapshot(async (snap) => {
                const { error, sessionId } = snap.data();
                if (error) {
                  // Show an error to your customer and
                  // inspect your Cloud Function logs in the Firebase console.
                    alert(`An error occured: ${error.message}`);
                }
                if (sessionId) {
                  // We have a session, let's redirect to Checkout
                  // Init Stripe
                    const stripe = await loadStripe('pk_test_51I81KKFEWEsMSzk3yWka7l1hRyXyeyOVUHYkkSdHx8v9r6D7L8RYBYKlklNrLE13x6tIKB16qzDgvJabS30lVtwl001eRozpGn');
                    stripe.redirectToCheckout({ sessionId });
                }
            });
        }

    return (
        <Text>
            <button onClick={ handleCheckout }>go</button>
        </Text>
    );
}

export default Payment
