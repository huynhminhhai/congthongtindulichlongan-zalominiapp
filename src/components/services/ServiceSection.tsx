import TitleSection from "components/titleSection"
import React from "react"
import { Box } from "zmp-ui"
import images from "assets/images"
import { ServicesType } from "constants/utinities"
import ServiceItem from "./ServiceItem"

export const SERVICES: ServicesType[] = [
    {
        label: 'Tin tức',
        url: '/news',
        icon: images.news
    },
    {
        label: 'Sự kiện',
        url: '/events',
        icon: images.event
    },
    {
        label: 'Điểm đến nổi bật',
        url: '/destination',
        icon: images.location
    },
    {
        label: 'Điểm du lịch',
        url: '/destination-travel',
        icon: images.destinationTravel
    },
    {
        label: 'Đặc sản',
        url: '/cusine',
        icon: images.goiCuon
    },
    {
        label: 'Nhà hàng',
        url: '/restaurant',
        icon: images.restaurant
    },
    {
        label: 'Lưu trú',
        url: '/hotel',
        icon: images.hotel
    },
    {
        label: 'Tour du lịch',
        url: '/tour',
        icon: images.destination
    },
    {
        label: 'Hướng dẫn viên',
        url: '/guide',
        icon: images.tourGuide
    },
    
    {
        label: 'Yêu thích',
        url: '/favorite',
        icon: images.lover
    },
    {
        label: 'Phản ánh',
        url: '/feedback',
        icon: images.feedback
    },
]

type ServiceSectionProps = {
    setSheetVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceSection: React.FC<ServiceSectionProps> = ({setSheetVisible}) => {
    return (
        <Box>
            <Box p={4} className="transform -translate-y-3 bg-white rounded-t-lg">
                <TitleSection title="" />
                <Box>
                    <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                        {
                            SERVICES.map((item: ServicesType, index: React.Key) => (
                                <ServiceItem key={index} data={item} />
                            ))
                        }
                        <Box
                        onClick={() => {
                            setSheetVisible(true);
                        }}
                        >
                            <div className="flex-center flex-col gap-2">
                                <Box>
                                    <div className="flex-center w-[60px] h-[60px] relative">
                                        <img src={images.more} alt='Tiện ích khác' />
                                    </div>
                                </Box>
                                <Box>
                                    <h4 className="text-[14px] leading-[18px] text-center font-medium">Tiện ích khác</h4>
                                </Box>
                            </div>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}

export default ServiceSection