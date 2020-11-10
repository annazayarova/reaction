import styled from 'styled-components';

const Title = styled.h1`
    color: ${ ({ grey, theme }) => grey ? theme.grey : theme.text };
    text-align: left;
    font-size: 15px;
    line-height: 24px;
    font-family: bold, Verdana;
    text-decoration: ${ ({ lineThrough }) => lineThrough ? 'line-through' : 'none' };
`;

export default Title;
