import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';

import '../../styles/swiper.css';
import img from '../../img/like.svg';
import Story from './StorySmall'

const StoriesSmall = ({
    visible
}) => {
    const stories = [ {
        img: img,
        title: "asas asda asda as asd asdasda"
}, {
    img: img,
    title: "asas asda asda as asd asdasda"
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
                            <Story key={ index }
                                src={ story.img }
                                title={ story.title }
                            />
                        ) }
                    </Swiper>
                </Root>
            }
        </>
    );
}

export default StoriesSmall;

const Root  = styled.div`
    margin-top: 24px;
`;
