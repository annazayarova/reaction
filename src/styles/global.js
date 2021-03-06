import styled, { createGlobalStyle } from 'styled-components';

import bold from '../fonts/ApercuPro-Bold.woff';
import bold2 from '../fonts/ApercuPro-Bold.woff2';

import regular from '../fonts/ApercuPro-Regular.woff';
import regular2 from '../fonts/ApercuPro-Regular.woff2';

import medium from '../fonts/ApercuPro-Medium.woff';
import medium2 from '../fonts/ApercuPro-Medium.woff2';

import light from '../fonts/ApercuPro-Light.woff';
import light2 from '../fonts/ApercuPro-Light.woff2';

import mono from '../fonts/ApercuPro-Mono.woff';
import mono2 from '../fonts/ApercuPro-Mono.woff2';

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: bold;
    src: url(${ bold2 }) format('woff2'),
        url(${ bold }) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: regular;
    src: url(${ regular2 }) format('woff2'),
        url(${ regular }) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: medium;
    src: url(${ medium2 }) format('woff2'),
        url(${ medium }) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: light;
    src: url(${ light2 }) format('woff2'),
        url(${ light }) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: mono;
    src: url(${ mono2 }) format('woff2'),
        url(${ mono }) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }

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
        overflow-x: hidden
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
