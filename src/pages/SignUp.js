import { withRouter } from 'react-router';
import db from '../services/firebase';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Title from '../components/common/Title';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, displayName } = event.target.elements;
        try {
            const { user } = await db
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);

            if (user) {
                const uid = db.auth().currentUser.uid;

                db.firestore().collection('users').doc(uid)
                .set({
                    displayName: displayName.value
                })
                history.push(`/${ uid }`);
            }
        } catch (error) {
            alert(error);
        }
    }, [ history ]);

    return (
        <Root>
            <StyledTitle>
                Sign up
            </StyledTitle>

            <form onSubmit={ handleSignUp }>
                <StyledInput autoFocus
                    name="displayName"
                    type="text"
                    placeholder="Property name"
                    notTransparent
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

                <Button label="Sign up"
                    type="submit"
                    notTransparent
                />
            </form>
        </Root>
    );
};

export default withRouter(SignUp);

const StyledInput = styled(Input)`
    margin-bottom: 24px;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 24px;
`;

const Root = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    height: 100%;
    align-items: center;
    flex-direction: column;
`;
