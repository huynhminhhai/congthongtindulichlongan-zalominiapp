import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import RestaurantItem from './RestaurantItem';
import { useTranslation } from 'react-i18next';

export const restaurantData = [
    {
        title: 'Nhà Hàng Sân Golf West Lakes',
        imgUrl: 'https://file.hstatic.net/200000844097/file/st-lakes-golf-_-villas-goda-golf__27__6fcee2c4056e477cac6b367fb45011f2.png',
        address: 'Số 145, ĐT822, ấp Chánh, Đức Hòa, Long An Tỉnh Long An'
    },
    {
        title: 'HẢI SẢN PHÚ QUÝ',
        imgUrl: 'https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/hai_san_phu_quy/hai_san_phu_quy_11_521496205.jpg',
        address: '09 Đường số 1, KDC Đường 10 Tỉnh Long An'
    },
    {
        title: 'Hải sản Hoàng',
        imgUrl: 'https://lh4.googleusercontent.com/proxy/1kWPmEJzM6rbgs0UMGzb9Wbd-mWw-PBlMjSNHHoUvJ7vqU8ZndjLHdo9lRdvR0Uzu3B6Da5DeFSJcESahFUPSVPqL0GaAzXbDHXFnw5djkkepJOU9pE0FyeLnHKPTHzG3so6tvXigKnW_so4kAlh7owKkQ',
        address: '133 Đường Phan Văn Mãng, KP9, Thị trấn Bến Lức, Tỉnh Long An'
    },
]

const RestaurantSection: React.FC = () => {

    const navigate = useNavigate()
    const { t } = useTranslation("common");

    return (
        <Box py={4} pl={4}>
            <Box pr={4}>
                <TitleSection title={t("restaurants")} handleClick={() => navigate('/news')} />
            </Box>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.06}
                loop
            >
                {
                    restaurantData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <RestaurantItem data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}

export default RestaurantSection