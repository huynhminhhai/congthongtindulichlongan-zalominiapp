import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LocationItem from './LocationItem'
import { useTranslation } from 'react-i18next'
import {
  SLIDE_PER_VIEW_HOMEPAGE,
  SLIDE_SPACE_BETWEEN_HOMEPAGE,
} from 'utils/constants'

const LocationSection: React.FC<any> = ({ data, title }) => {
  const navigate = useNavigate()

  return (
    <Box py={5} pl={4}>
      <Box pr={4}>
        <TitleSection title={title} handleClick={() => navigate('/hotel')} />
      </Box>
      <Swiper
        spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE}
        slidesPerView={SLIDE_PER_VIEW_HOMEPAGE}
        loop
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <LocationItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default LocationSection
