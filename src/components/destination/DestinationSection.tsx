import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import DestinationItem from './DestinationItem'
import TitleSection from 'components/titleSection'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'react-i18next';

export const destinationData = [
    {
        title: 'Nhà Trăm Cột',
        imgUrl: 'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg'
    },
    {
        title: 'Làng nổi Tân Lập',
        imgUrl: 'https://dulichtoivaban.com/wp-content/uploads/2023/08/Khu-du-lich-sinh-thai-Lang-Noi-Tan-Lap-o-Long-An.jpg.webp'
    },
    {
        title: 'Cửa khẩu Quốc tế Bình Hiệp',
        imgUrl: 'https://cdn.media.dulich24.com.vn/diemden/cua-khau-binh-hiep-7264/cua-khau-binh-hiep-1.jpg'
    },
    {
        title: 'Bảo tàng Long An',
        imgUrl: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/sangvt.lan/tien_ich/dia_diem/bao_tang_long_an/unnamed_1_copy_637189302797678077.jpg'
    },
    {
        title: 'Công viên 7 Kỳ Quan Thế Giới',
        imgUrl: 'https://houserentaldanang.com/wp-content/uploads/2023/09/Cong-vien-7-ky-quan-Da-Nang-7.jpg'
    },
]

const DestinationSection = () => {

    const { t } = useTranslation("common");
    const navigate = useNavigate()

    return (
        <Box py={4} pl={4}>
            <Box pr={4}>
                <TitleSection title={t("destinations")} handleClick={() => navigate('/destination')} />
            </Box>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.06}
                loop
            >
                {
                    destinationData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <DestinationItem data={item}  />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}

export default DestinationSection