import styled from 'styled-components';

const Text = styled.p`
    color: ${ ({ active, grey, theme }) => active ? theme.primary : grey ? theme.grey : theme.text };
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    padding: 0;
    font-family: ${ ({ bold, medium }) => medium ? 'medium, Verdana' : bold ? 'bold, Verdana' : 'regular, Verdana' };
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };
`;

export default Text;
