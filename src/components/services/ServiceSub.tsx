import { ServicesType } from 'constants/utinities'
import React from 'react'
import { Box, Sheet } from 'zmp-ui'
import ServiceItem from './ServiceItem'
import images from 'assets/images'

export const SERVICESOTHER: ServicesType[] = [
    {
        label: 'Điểm mua sắm',
        url: '/shopping',
        icon: images.shopping
    },
    {
        label: 'Chợ',
        url: '/market',
        icon: images.market
    },
    {
        label: 'Bến xe',
        url: '/bus',
        icon: images.bus
    },
    {
        label: 'Tuyến xe',
        url: '/bus-routing',
        icon: images.route
    },
    {
        label: 'Taxi',
        url: '/taxi',
        icon: images.taxi
    },
    {
        label: 'Xăng/dầu',
        url: '/oil',
        icon: images.bio
    },
    {
        label: 'Cơ sở y tế',
        url: '/hospital',
        icon: images.hospital
    },
    {
        label: 'ATM',
        url: '/atm',
        icon: images.atm
    },
    {
        label: 'Thư viện ảnh',
        url: '/gallery',
        icon: images.gallery
    },
]

type ServiceSubProps = {
    sheetVisible: boolean,
    setSheetVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceSub: React.FC<ServiceSubProps> = ({sheetVisible, setSheetVisible}) => {
    return (
        <Sheet
            visible={sheetVisible}
            onClose={() => setSheetVisible(false)}
            autoHeight
            // mask
            // handler
            swipeToClose
        >
            <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
                <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                    {
                        SERVICESOTHER.map((item: ServicesType, index: React.Key) => (
                            <ServiceItem key={index} data={item} />
                        ))
                    }
                </div>
            </Box>
        </Sheet>
    )
}

export default ServiceSub