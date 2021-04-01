import React from 'react';
import styled from 'styled-components';

const LoadingBar = ({
    className,
    width = '100%',
    height = '15px'
}) => {
    return (
        <Root className={ className }
            width={ width }
            height={ height }
        />
    );
};

export default LoadingBar;

const Root = styled.div`
    animation: pulse 1.5s ease-in-out infinite;
    background-color: ${ props => props.theme.content};
    background: linear-gradient(
        -90deg,
        ${ props => props.theme.content } 0%,
        ${ props => props.theme.border } 50%,
        ${ props => props.theme.content } 100%
    );
    height: ${ props => props.height };
    background-size: 400% 400%;
    width: ${ props => props.width };

    @keyframes pulse {
        0% {
            background-position: 0% 0%;
        }

        100% {
            background-position: -135% 0%;
        }
    }
`;
