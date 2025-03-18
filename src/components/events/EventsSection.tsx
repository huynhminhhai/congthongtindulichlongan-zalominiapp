import { useGetNewsList } from "apiRequest/news"
import images from "assets/images"
import { NewsSectionSkeleton } from "components/skeleton"
import TitleSection from "components/titleSection"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const initParam = {
    page: 1,
    pageSize: 5,
};

const EventsSection: React.FC = () => {

    const [param, setParam] = useState(initParam);
    const navigate = useNavigate()

    const { data, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || []

    if (isLoading) {
        return <NewsSectionSkeleton count={1} />
    }

    return (
        <>
            {
                listData && listData.length > 0 ?
                    <>
                        <Box py={4} pl={4} className="news-section">
                            <Box pr={4}>
                                <TitleSection title="Sự kiện mới nhất" handleClick={() => navigate('/events')} />
                            </Box>
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={1.06}
                                loop
                            >
                                {
                                    listData.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div onClick={() => navigate(`/events-detail/?id=${item.id}`)}>
                                                <img
                                                    className="slide-img h-[200px] w-full object-cover rounded-xl"
                                                    src={images.eventThumnail}
                                                    alt={item.title}
                                                />
                                                <div className="flex items-center justify-between mt-3 mb-2 pb-2 border-b-[1px] border-[#355933]">
                                                    <div className="text-[13px] leading-[1] font-semibold">{item.category || 'Sự kiện'}</div>
                                                    <div className="text-[12px] leading-[1] font-medium">{item.publisedDate || '18/03/2025'}</div>
                                                </div>
                                                <h3 className="text-[16px] font-semibold whitespace-normal mt-2 line-clamp-2 ">{item.title}</h3>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </Box>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default EventsSection