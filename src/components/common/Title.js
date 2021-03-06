import styled from 'styled-components';

const Title = styled.h1`
    color: ${ ({ grey, theme }) => grey ? theme.grey : theme.text };
    text-align: left;
    font-size: 18px;
    line-height: 24px;
    font-family: ${ ({ medium }) => medium ? 'medium' : 'bold' };
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };
    letter-spacing: -1px;

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
