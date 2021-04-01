import styled from 'styled-components';

const Text = styled.p`
    color: ${ ({ disabled, grey, primary, red, theme }) =>
        red ? theme.red :
        primary ? theme.primary :
        grey ? theme.grey :
        disabled ? theme.disabled : theme.text };
    font-size: 16px;
    line-height: 20px;
    margin: 0;
    padding: 0;
    font-family: ${ ({ bold, medium }) => medium ? 'medium, Arial' : bold ? 'bold, Arial' : 'regular, Arial' };

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
