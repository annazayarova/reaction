import { withRouter } from "react-router";
import React, { useCallback, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { loginRoute } from '../helpers/routes';
import Button from '../components/common/Button';
import db from "../services/firebase";
import Input from '../components/common/Input';
import Text from '../components/common/Text';
import Title from '../components/common/Title';

const PasswordReset = ({ history }) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

	const handlePasswordReset = useCallback(
		async event => {
            event.preventDefault();
            setLoading(true);

			const { email } = event.target.elements;

			try {
				await db
				.auth()
                .sendPasswordResetEmail(email.value);

				history.push(loginRoute);
			} catch (error) {
                setLoading(false);
				setError(error.message);
			}
		},
	[history]
);

    return (
        <Root>
            <StyledTitle>
                Check your email after submitting
            </StyledTitle>

            <Form onSubmit={ handlePasswordReset }>
                <StyledInput autoFocus
                    name="email"
                    type="email"
					placeholder="Email"
					notTransparent
                />

                <Error small red>{ error }</Error>

                <Button label="Submit"
                    type="submit"
                    notTransparent
                    loading={ loading }
                />
            </Form>

            <StyledText><StyledLink to={ loginRoute }>Back to Sign in</StyledLink></StyledText>
        </Root>
    );
};

export default withRouter(PasswordReset);

const Error = styled(Text)`
    margin-bottom: 12px;
    float: right;
`;

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
