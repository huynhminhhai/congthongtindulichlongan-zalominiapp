import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { SingleLocationMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { busData } from './bus-routing'
import BusMap from 'components/maps/BusMap'
import { useTranslation } from 'react-i18next'

const location = {
    lat: 10.537824636906599,
    lng: 106.40475073924593,
    name: "Bến xe Long An - Bến xe Đức Huệ",
    address: "  Số 113, QL1, P2, TP Tân An, Long An",
    img: "https://www.zappiamotors.com/wp-content/uploads/2024/02/ben-xe-long-an-cung-cap-thuc-an-nhanh-va-nuoc-giai-khat.jpg",
    markerImg: images.markerBus,
};

const busStops = [
    { name: 'Bến xe Long An', lat: 10.537803541130945, lng: 106.40476146808156 },
    { name: 'Hùng Vương', lat: 10.539371601842227, lng: 106.40461577088507 },
    { name: 'Hùng Vương', lat: 10.550287919910376, lng: 106.39861105472117 },
    { name: 'Đường tráng QL1A', lat: 10.562689589061831, lng: 106.42000937575203 },
    { name: 'Đường tráng QL1A', lat: 10.598764504793492, lng: 106.4409676497632 },
    { name: 'Tỉnh lộ 830', lat: 10.636379491762362, lng: 106.46936310645887 },
    { name: 'Tỉnh lộ 22', lat: 10.857431299659426, lng: 106.30636598768227 },
    { name: 'Bến xe Đức Huệ', lat: 10.899005145554527, lng: 106.30999023695371 },
];

const BusRoutingDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('bus-route-detail')} />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title={location.name} />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>
                        {/* <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box> */}
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('infor')} />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>Bến xe Long An - Hùng Vương - Đường tránh Quốc lộ 1 - Tỉnh lộ 830 - Tỉnh lộ 22 - Bến xe Đức Huệ</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={20} icon='mingcute:time-line' />
                                        <div className='flex-1'>5h30 - 19h00</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={20} icon='mingcute:time-line' />
                                        <div className='flex-1'>15 phút/chuyến</div>
                                    </li>
                                    {/* <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>sanhafood.longan@gmail.com</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='mdi-light:phone' />
                                        <div className='flex-1'>0397455789</div>
                                    </li> */}
                                </ul>
                            </Box>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('desc')} />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                __html: `
                                    <p>Bến xe Long An - Hùng Vương - Đường tránh Quốc lộ 1 - Tỉnh lộ 830 - Tỉnh lộ 22 - Bến xe Đức Huệ</p>
                                `}}>
                            </div>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('map')} />
                            <div className="infor-map">
                                <BusMap busStops={busStops}/>
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title={tPage('bus-route-others')} mB={2} handleClick={() => navigate('/bus-routing')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                busData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/bus-routing-detail')}>
                                        <ItemDetailCard imgUrl={item.img} title={item.name} desc={item.time} />
                                    </Box>
                                ))
                            }
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default BusRoutingDetailPage