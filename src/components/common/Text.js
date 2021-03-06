import styled from 'styled-components';

const Text = styled.p`
    color: ${ ({ active, grey, theme, red }) => red ? theme.red : active ? theme.primary : grey ? theme.grey : theme.text };
    font-size: 15px;
    line-height: 22px;
    margin: 0;
    padding: 0;
    font-family: ${ ({ bold, medium }) => medium ? 'medium, Arial' : bold ? 'bold, Arial' : 'regular, Arial' };
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };

    ${ ({ small }) => small && `
        font-size: 14px;
        line-height: 20px;
    `};

    ${ ({ big }) => big && `
        font-size: 17px;
        line-height: 24px;
    `};

    @media(max-width: ${ ({ theme }) => theme.tabletBreakpoint }) {
        ${ ({ big }) => big && `
            font-size: 15px;
            line-height: 20px;
        `}
    }
`;

export default Text;
