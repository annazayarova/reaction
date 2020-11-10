import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
    return (
        <Root>
            <Link to="/login">
                Login
            </Link>

            or
            
            <Link to="/signup">
                Create menu
            </Link>

            for your coffee shop, bar, hotel or restaurant
        </Root>
    );
}

export default Home;

const Root = styled.div`
`;
