import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-stretch: normal;
        font-style: normal;
        text-rendering: optimizeLegibility;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    button {
        font-weight: normal;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    body {
        background: ${ ({ theme }) => theme.body };
        color: ${ ({ theme }) => theme.text };
        font-family: regular, Arial, sans-serif;
        font-size: 15px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        transition: all 0.15s linear;
    }

    html,
    body,
    #root {
        height: 100%;
        width: 100%;
    }

    img, svg {
        width: 100%;
    }
`;

export const Centered = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
`;
