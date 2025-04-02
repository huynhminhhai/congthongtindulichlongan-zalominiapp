import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import DestinationItem from './DestinationTravelItem'
import TitleSection from 'components/titleSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useTranslation } from 'react-i18next'
import {
  SLIDE_PER_VIEW_HOMEPAGE,
  SLIDE_SPACE_BETWEEN_HOMEPAGE,
} from 'utils/constants'

export const destinationTravelData = [
  {
    title: 'DI TÍCH NGÃ TƯ RẠCH KIẾN',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/huongvamco/huyen_can_duoc/nga_tu_rach_kien/diem_qua_7_di_tich_lich_su_noi_bat_o_long_an_2_218845898.jpg',
  },
  {
    title: 'DI TÍCH CHÙA PHƯỚC LÂM',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/huongvamco/huyen_can_duoc/phuoc_lam/chua_phuoc_lam_long_an_1_700x385_242728256.jpg',
  },
  {
    title: 'Cánh đồng bất tận',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/toanlm.lan/hinh_diem/khudulichcanhdongbattan_263205966.jpg',
  },
  {
    title: 'DI TÍCH LỊCH SỬ NHÀ TỔNG THẬN',
    imgUrl:
      'https://scontent.iocvnpt.com/resources/portal//Images/LAN/sangvt.lan/tien_ich/dia_diem/dinh_tong_than/8566_nha_tong_than_637189153551780877.jpg',
  },
  {
    title: 'KHU DI TÍCH LỊCH SỬ CÁCH MẠNG TỈNH LONG AN',
    imgUrl:
      'https://www.baolongan.vn/image/news/2017/20171025/fckimage/7118_B%C3%ACnh-Th%C3%A0nh.jpg',
  },
]

const DestinationSection = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  return (
    <Box py={4} pl={4}>
      <Box pr={4}>
        <TitleSection
          title={t('destinations-travel')}
          handleClick={() => navigate('/destination-travel')}
        />
      </Box>
      <Swiper
        spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE}
        slidesPerView={SLIDE_PER_VIEW_HOMEPAGE}
        loop
      >
        {destinationTravelData.map((item, index) => (
          <SwiperSlide key={index}>
            <DestinationItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default DestinationSection
