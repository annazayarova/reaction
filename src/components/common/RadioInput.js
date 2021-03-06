import React from 'react';
import styled from 'styled-components';

import Text from './Text';

const RadioInput = ({
    label,
    checked,
    className,
    onChange,
    value
}) => {
    const renderCircle = () => (checked ? <CircleFilled /> : <Circle />);

    return (
        <Label className={ className }>
            <input type="radio"
                checked={ checked }
                onChange={ onChange }
                value={ value }
            />

            { renderCircle() }

            <StyledText>{ label }</StyledText>
        </Label>
    );
}

export default RadioInput;

const Label = styled.label`
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;

    input {
        visibility: hidden;
        width: 0;
        height: 0;
    }
`;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${ ({ theme }) => theme.grey };
    position: relative;
`;

const CircleFilled = styled(Circle)`
    border: 1px solid ${ ({ theme }) => theme.primary };

    &:after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        background: ${ ({ theme }) => theme.primary };
        border-radius: 50%;
        top: 3px;
        left: 3px;
    }
`;

const StyledText = styled(Text)`
    margin-left: 8px;
`;
