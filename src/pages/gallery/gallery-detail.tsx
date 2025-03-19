import { HeaderSub } from 'components/header-sub'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export const imagesGallery = [
    'https://truyenhinhvov.qltns.mediacdn.vn/239964650902032384/2022/9/8/107-09-2022-12-55-02-1662625161048-16626251611611410362641.jpg',
    'https://file1.dangcongsan.vn/data/0/images/2024/01/24/upload_37/bedc773dc95762093b46.jpg',
    'https://vcdn1-dulich.vnecdn.net/2021/06/17/12-1623680138-1623894501.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=COZzW8c4OFuEUh2NFh5JKQ',
    'https://vcdn1-dulich.vnecdn.net/2024/10/21/Tan-Lap1-2269-1729507892.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=4JS_1N5gEjh19Hm-bha7vg'
]

const GalleryDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết thư viện ảnh" />
                <div className='bg-[#222222] h-[95vh] flex flex-col items-center justify-center'>
                    <Swiper
                        spaceBetween={10}
                        loop
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="mb-4 max-w-[360px] h-auto object-contain"
                    >
                        {imagesGallery.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Slide ${index}`} className="w-full h-full object-contain" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Box>
        </Page>
    )
}

export default GalleryDetailPage