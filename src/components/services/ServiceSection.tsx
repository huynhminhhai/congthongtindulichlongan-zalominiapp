import React from "react"
import { Box } from "zmp-ui"
import images from "assets/images"
import { ServicesType } from "constants/utinities"
import ServiceItem from "./ServiceItem"
import { useTranslation } from "react-i18next"

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
        label: 'Phản ánh',
        url: '/feedback',
        icon: images.feedback
    },
    {
        label: 'Thư viện ảnh',
        url: '/gallery',
        icon: images.gallery
    },
]

type ServiceSectionProps = {
    setSheetVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceSection: React.FC<ServiceSectionProps> = ({setSheetVisible}) => {

    const { t } = useTranslation("common");

    const SERVICES: ServicesType[] = [
        {
            label: t("news"),
            url: '/news',
            icon: images.news
        },
        {
            label: t("events"),
            url: '/events',
            icon: images.event
        },
        {
            label: t("destinations"),
            url: '/destination',
            icon: images.location
        },
        {
            label: t("destinations-travel"),
            url: '/destination-travel',
            icon: images.destinationTravel
        },
        {
            label: t("cusine"),
            url: '/cusine',
            icon: images.goiCuon
        },
        {
            label: t("restaurants"),
            url: '/restaurant',
            icon: images.restaurant
        },
        {
            label: t("accommodations"),
            url: '/hotel',
            icon: images.hotel
        },
        {
            label: t("tours"),
            url: '/tour',
            icon: images.destination
        },
        {
            label: t("tour-guide"),
            url: '/guide',
            icon: images.tourGuide
        },
        {
            label: t("feedbacks"),
            url: '/feedback',
            icon: images.feedback
        },
        {
            label: t("gallery"),
            url: '/gallery',
            icon: images.gallery
        },
    ]

    return (
        <Box>
            <Box p={4} className="bg-white">
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
                                    <h4 className="text-[14px] leading-[18px] text-center font-medium">{t("utilities")}</h4>
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