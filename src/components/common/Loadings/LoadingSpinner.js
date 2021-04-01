import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({
    className,
    color = 'white',
    size = '20px'
}) => {
    return (
        <Root className={ className }
            size={ size }>
            <Spinner viewBox="25 25 50 50">
                <Circle cx="50"
                    cy="50"
                    fill="none"
                    r="20"
                    stroke={ color }
                    strokeWidth="4px" />

                <AnimatedCircle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="20"
                    stroke={ color }
                    strokeWidth="4px"
                />
            </Spinner>
        </Root>
    );
};

export default LoadingSpinner;

const keyFrameDash = keyframes`
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124;
    }
`;

const keyFrameRotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const AnimatedCircle = styled.circle`
    animation: ${ keyFrameDash } 1.5s ease-in-out infinite;
`;

const Circle = styled.circle`
    opacity: 0.4;
`;

const Root = styled.div`
    ${ ({ size }) => `
        width: ${ size };
        height: ${ size };
    ` }
`;

const Spinner = styled.svg`
    animation: ${ keyFrameRotate } 2s linear infinite;
    height: 100%;
    width: 100%;
`;
