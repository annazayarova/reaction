import { withRouter, Redirect } from "react-router";
import React, { useCallback, useContext } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Auth';
import Button from '../components/common/Button';
import db from "../services/firebase";
import Input from '../components/common/Input';
import Title from '../components/common/Title';
import Text from '../components/common/Text';

const Login = ({ history }) => {
    const { currentUser } = useContext(AuthContext);

	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;

			try {
				await db
				.auth()
				.signInWithEmailAndPassword(email.value, password.value);

				currentUser && history.push(`/${ currentUser.uid }`)
			} catch (error) {
				alert(error);
			}
		},
	[history, currentUser]
);

if (currentUser) {
    return <Redirect to={ `/${ currentUser.uid }` }  />;
}

    return (
        <Root>
            <StyledTitle>
                Log in
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

                <Button label="Login"
                    type="submit"
                    notTransparent
                />
            </Form>

            <StyledText>or <StyledLink to="/signup">Sign up</StyledLink> to join Reaction menu</StyledText>

            <StyledText><StyledLink to="/passwordReset">Forgot password?</StyledLink></StyledText>
        </Root>
    );
};

export default withRouter(Login);

const StyledInput = styled(Input)`
    margin: 24px 0;
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

const Form = styled.form`width: 100%;`;

const StyledText = styled(Text)`
    margin-top: 24px;
    text-align: center;
    width: 100%;
`;

const StyledLink = styled(Link)`
    color: ${ ({ theme }) => theme.primary };
    text-decoration: underline;
`;
