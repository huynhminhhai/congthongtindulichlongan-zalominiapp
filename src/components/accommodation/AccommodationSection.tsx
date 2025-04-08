import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import AccommodationItem from './AccommodationItem'
import {
  SLIDE_PER_VIEW_HOMEPAGE,
  SLIDE_SPACE_BETWEEN_HOMEPAGE,
} from 'utils/constants'

const AccommodationSection: React.FC<any> = ({ data, title, type }) => {
  const navigate = useNavigate()

  return (
    <Box py={5} pl={4}>
      <Box pr={4}>
        <TitleSection
          title={title}
          handleClick={() =>
            navigate('/accommodation', {
              state: { type: type },
            })
          }
        />
      </Box>
      <Swiper
        spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE}
        slidesPerView={SLIDE_PER_VIEW_HOMEPAGE}
        loop
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <AccommodationItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default AccommodationSection
