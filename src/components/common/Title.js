import styled from 'styled-components';

const Title = styled.h1`
    color: ${ ({ disabled, grey, theme }) =>
        grey ? theme.grey :
        disabled ? theme.disabled : theme.text };
    text-align: left;
    font-size: 18px;
    line-height: 24px;
    font-family: ${ ({ medium }) => medium ? 'medium, Arial' : 'bold, Arial' };
    text-transform: ${ ({ uppercase }) => uppercase && 'uppercase' };


    ${ ({ big }) => big && `
        font-size: 78px;
        line-height: 90px;
    `}

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        ${ ({ big }) => big && `
            font-size: 42px;
            line-height: 54px;
        `}
    }
`;

export default Title;
