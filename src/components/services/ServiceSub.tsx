import { ServicesType } from 'constants/utinities'
import React from 'react'
import { Box, Sheet } from 'zmp-ui'
import ServiceItem from './ServiceItem'
import images from 'assets/images'
import { useTranslation } from 'react-i18next'

type ServiceSubProps = {
    sheetVisible: boolean,
    setSheetVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceSub: React.FC<ServiceSubProps> = ({ sheetVisible, setSheetVisible }) => {

    const { t } = useTranslation("common");

    const SERVICESOTHER: ServicesType[] = [
        {
            label: t("shoppings"),
            url: '/shopping',
            icon: images.shopping
        },
        {
            label: t("markets"),
            url: '/market',
            icon: images.market
        },
        {
            label: t("bus-stop"),
            url: '/bus',
            icon: images.bus
        },
        {
            label: t("bus-route"),
            url: '/bus-routing',
            icon: images.route
        },
        {
            label: t("taxi"),
            url: '/taxi',
            icon: images.taxi
        },
        {
            label: t("fuel"),
            url: '/oil',
            icon: images.bio
        },
        {
            label: t("medical"),
            url: '/hospital',
            icon: images.hospital
        },
        {
            label: t("atm"),
            url: '/atm',
            icon: images.atm
        },
    ]


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