import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';

import '../../styles/swiper.css';
import img from '../../img/2.jpg';
import Text from '../common/Text';

const StoriesSmall = ({
    visible
}) => {
    const stories = [ {
        img: img,
        title: "Soup of the day"
}, {
    img: img,
    title: "Special offer"
}, {
    img: img,
    title: "Brunch till ..."
}, {
    img: img,
    title: "Brunch till ..."
} ]
    const params = {
        slidesPerView: '3',
        spaceBetween: 8,
        freeMode: true
    }

    return (
        <>
            { visible &&
                <Root>
                    <Swiper { ...params }>
                        { stories.map((story, index) =>
                            <Story>
                            <Img src={ story.img } alt="Reaction menu" />

                            <StyledText bold
                                small
                            >
                                { story.title }
                            </StyledText>
                        </Story>
                        ) }
                    </Swiper>
                </Root>
            }
        </>
    );
}

export default StoriesSmall;

const Root  = styled.div`
    margin: 24px 0 0 24px;
`;

const Story  = styled.div`
    position: relative;
`;

const StyledText  = styled(Text)`
    position: absolute;
    left: 8px;
    bottom: 12px;
    color: ${ ({ theme }) => theme.content };
`;


const Img  = styled.img`
    width: 100%;
`;
