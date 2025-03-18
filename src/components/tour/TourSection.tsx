import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TourItem from './TourItem';

export const tourData = [
    {
        title: 'Vi vu buổi tối tại Long An',
        imgUrl: 'https://ik.imagekit.io/tvlk/blog/2022/12/dia-diem-du-lich-long-an-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
        date: 2,
        place: 1,
        price: '190.000đ'
    },
    {
        title: 'Tour 01 ngày- khách nội địa',
        imgUrl: 'https://datviettour.com.vn/uploads/images/mien-nam/long-an/danh-thang/tour-lang-noi-tan-lap-long-an.jpg',
        date: 1,
        place: 1,
        price: '0đ'
    },
    {
        title: 'Tour 2 ngày 1 đêm- khách nội địa',
        imgUrl: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/duc_hoa/lang_co_phuoc_loc_tho/cropper_637189358343630424.jpg',
        date: 3,
        place: 2,
        price: '350.000đ'
    },
]

const TourSection: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box py={4} pl={4}>
            <Box pr={4}>
                <TitleSection title="Tour du lịch" handleClick={() => navigate('/news')} />
            </Box>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.06}
                loop
            >
                {
                    tourData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <TourItem data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}

export default TourSection