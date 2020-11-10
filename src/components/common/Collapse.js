import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../common/Text';
import Block from '../common/Block';

const Collapse = ({ title, items }) => {
    const [ open, setOpen ] = useState(false);

    return (
        <>
            <Block onClick={ () => setOpen(!open) }>
                <Text>
                    { title }
                </Text>
            </Block>

            <List open={ open }>
                { items.map((item, index) =>
                    <StyledBlock onClick={ item.action }
                        key={ index }
                    >
                        <Text>
                            { item.name }
                        </Text>
                    </StyledBlock>)
                }
            </List>
        </>
    );
}

export default Collapse;

const List = styled.div`
    display: ${ ({ open }) => open ? 'block' : 'none' };
`;

const StyledBlock = styled(Block)`
    padding-left: 24px;
    width: 100%;
`;
