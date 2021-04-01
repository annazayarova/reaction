import React from 'react';
import styled from 'styled-components';

import img from '../img/1.jpeg'
const Intro = ({

}) => {
    return (
        <Root>
            <Img src={ img } />
        </Root>
    );
};

export default Intro;

const Img = styled.img`
	display: block;
`;
const Root = styled.div`
    position: relative;
`;
