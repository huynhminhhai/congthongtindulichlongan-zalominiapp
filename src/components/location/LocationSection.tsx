import TitleSection from 'components/titleSection';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, useNavigate } from 'zmp-ui';

import LocationItem from './LocationItem';

import 'swiper/css';

import { SLIDE_PER_VIEW_HOMEPAGE, SLIDE_SPACE_BETWEEN_HOMEPAGE } from 'utils/constants';

const LocationSection = ({ data, title, type }) => {
  const navigate = useNavigate();

  return (
    <Box py={4} pl={4}>
      <Box pr={4}>
        <TitleSection title={title} handleClick={() => navigate('/location', { state: { type: type } })} />
      </Box>

      <Swiper spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE} slidesPerView={SLIDE_PER_VIEW_HOMEPAGE} loop>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <LocationItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LocationSection;
