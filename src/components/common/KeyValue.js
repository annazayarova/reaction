import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import Text from '../common/Text';

const KeyValue = ({
    autoFocus,
    hidden,
    label,
    value,
    onChange,
    placeholder,
    type = 'text'
}) => {
    return (
        <Root>
            <StyledText bold>
                { label }
            </StyledText>

            <Input autoFocus={ autoFocus }
                hidden={ hidden }
                value={ value }
                onChange={ onChange }
                placeholder={ placeholder }
                type={ type }
            />
        </Root>
    );
}

export default KeyValue;

const Root  = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
`;

const StyledText  = styled(Text)`
    margin-right: 48px;
`;
