import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import React, { useState } from "react";

import { AuthProvider } from "./Auth";
import { GlobalStyle } from './styles/global';

import { lightTheme, darkTheme } from './styles/theme';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NoMatchPage from './pages/NoMatchPage';
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./PrivateRoute";
import SignUp from "./pages/SignUp";
import Tenant from "./pages/Tenant";

const App = () => {
    const [ theme, setTheme ] = useState('light');
	const [ toggled, setToggled ] = useState(false);

	const handleToggleTheme = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
		setToggled(!toggled);
    };

    return (
        <AuthProvider>
            <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
                <GlobalStyle />

                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/signin">
                            <SignIn />
                        </Route>

                        <Route exact path="/signup">
                            <SignUp />
                        </Route>

                        <Route exact path="/passwordReset">
                            <PasswordReset />
                        </Route>

                        <Route exact path="/:id">
                            <Tenant theme={ theme }
                                onToggleTheme={ handleToggleTheme }
                                themeToggled={ toggled }
                            />
                        </Route>

                        <Route path="*">
                            <NoMatchPage />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
