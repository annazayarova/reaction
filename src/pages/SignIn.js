import { withRouter, Redirect } from "react-router";
import React, { useCallback, useContext, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Auth';
import Button from '../components/common/Button';
import db from "../services/firebase";
import Input from '../components/common/Input';
import Title from '../components/common/Title';
import Text from '../components/common/Text';

const SignIn = ({ history }) => {
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const { currentUser } = useContext(AuthContext);

	const handleLogin = useCallback(
		async event => {
            event.preventDefault();
            setLoading(true);

			const { email, password } = event.target.elements;

			try {
				await db
				.auth()
				.signInWithEmailAndPassword(email.value, password.value);

				currentUser && history.push(`/${ currentUser.uid }`)
			} catch (error) {
				setLoading(false);
                setError(error.message);
			}
		},
	[history, currentUser]
);

if (currentUser) {
    return <Redirect to={ `/${ currentUser.uid }` }  />;
}

    return (
        <>
        <Root>
            <StyledTitle>
                Subscriber's Sign in
            </StyledTitle>

            <Form onSubmit={ handleLogin }>
                <Input autoFocus
                    name="email"
                    type="email"
					placeholder="Email"
					notTransparent
                />

                <StyledInput name="password"
                    type="password"
					placeholder="Password"
					notTransparent
                />

                <Error small red>{ error }</Error>

                <Button label="Sign in"
                    type="submit"
                    notTransparent
                    loading={ loading }
                />
            </Form>

            <StyledText grey>or <StyledLink to="/signup">Subscribe</StyledLink> to create digital menu for your coffee shop, bar, hotel or restaurant</StyledText>

            <StyledText><StyledLink to="/passwordReset">Forgot password?</StyledLink></StyledText>
        </Root>
        </>
    );
};

export default withRouter(SignIn);

const Error = styled(Text)`
    margin-bottom: 12px;
    float: right;
`;

const StyledInput = styled(Input)`
    margin: 24px 0;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 24px;
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
        width: 80%;
        margin: 0 auto;
    }
`;

const Form = styled.form`width: 100%;`;

const StyledText = styled(Text)`
    margin-top: 24px;
    text-align: center;
    width: 100%;
`;

const StyledLink = styled(Link)`
    color: ${ ({ theme }) => theme.primary };
    text-decoration: underline;
    font-family: bold;
`;
