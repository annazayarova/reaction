import styled from 'styled-components';

const Caption = styled.span`
    color: ${ ({ grey, theme }) => grey ? theme.grey : theme.text };
    font-size: 13px;
    line-height: 16px;
`;

export default Caption;
