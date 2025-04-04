import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import HotelItem from './HotelItem'
import { useTranslation } from 'react-i18next'
import {
  SLIDE_PER_VIEW_HOMEPAGE,
  SLIDE_SPACE_BETWEEN_HOMEPAGE,
} from 'utils/constants'

export const hotelData = [
  {
    title: 'Khách sạn Ruby',
    imgUrl:
      'https://i.vntrip.vn/800x550/smart/https://statics.vntrip.vn/data-v2/hotels/611930/img_max/611930_1576550162_ru.jpg',
    address:
      'Đường Số 2, Khu Dân Cư Trung Tâm, Thị Trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An',
  },
  {
    title: 'Khách sạn Kim Linh',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/Can%20Giuoc/Khach%20san%20Kim%20Linh/av_637025786230053746.jpg',
    address:
      'Áp Hòa Thuận I, Xã Trường Bình Xã Trường Bình, Huyện Cần Giuộc, Tỉnh Long An',
  },
  {
    title: 'HOMESTAY VÀM CỎ FARMSTAY',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/toansauconkun994/thumb/1_647964214.jpg',
    address: 'Đường Rạch Tre, ấp 5, xã An Thạnh, huyện Bến Lức, tỉnh Long An',
  },
]

const HotelSection: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <Box py={4} pl={4}>
      <Box pr={4}>
        <TitleSection
          title={t('accommodations')}
          handleClick={() => navigate('/hotel')}
        />
      </Box>
      <Swiper
        spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE}
        slidesPerView={SLIDE_PER_VIEW_HOMEPAGE}
        loop
      >
        {hotelData.map((item, index) => (
          <SwiperSlide key={index}>
            <HotelItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default HotelSection
