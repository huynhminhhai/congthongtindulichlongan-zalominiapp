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

const location = {
    lat: 10.537824636906599,
    lng: 106.40475073924593,
    name: "Kỳ Son – Thạnh Hóa và Thạnh Hóa Bình Hiệp",
    address: "  Số 113, QL1, P2, TP Tân An, Long An",
    img: "https://www.zappiamotors.com/wp-content/uploads/2024/02/ben-xe-long-an-cung-cap-thuc-an-nhanh-va-nuoc-giai-khat.jpg",
    markerImg: images.markerBus,
};

const busStops = [
    { name: 'Bệnh viện Đa khoa', lat: 10.5453, lng: 106.4086 },
    { name: 'Nguyễn Thông', lat: 10.5470, lng: 106.4125 },
    { name: 'Châu Thị Kim', lat: 10.5492, lng: 106.4153 },
    { name: 'Hùng Vương', lat: 10.5525, lng: 106.4201 },
    { name: 'Nguyễn An Ninh', lat: 10.5550, lng: 106.4234 },
    { name: 'Hai Bà Trưng', lat: 10.5584, lng: 106.4281 },
    { name: 'Cách Mạng Tháng 8', lat: 10.5610, lng: 106.4325 },
    { name: 'Nguyễn Trung Trực', lat: 10.5642, lng: 106.4371 },
    { name: 'Trương Định', lat: 10.5669, lng: 106.4413 },
    { name: 'Võ Văn Tần', lat: 10.5703, lng: 106.4460 },
    { name: 'Trà Bình Quý', lat: 10.5731, lng: 106.4505 },
    { name: 'Hùng Vương (đoạn mới)', lat: 10.5757, lng: 106.4552 },
    { name: 'QL62', lat: 10.5801, lng: 106.4607 },
    { name: 'QL.N2', lat: 10.5900, lng: 106.4750 },
    { name: 'TT Thạnh Hóa', lat: 10.6050, lng: 106.4950 },
    { name: 'ĐT 836', lat: 10.6150, lng: 106.5100 },
    { name: 'QL62 (về Bình Hiệp)', lat: 10.6250, lng: 106.5250 },
    { name: 'Bãi đỗ xe Bình Hiệp', lat: 10.6400, lng: 106.5400 }
];

const BusRoutingDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết tuyến xe buýt" />
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
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>bệnh viện Đa khoa – Nguyễn Thông – Châu Thị Kim – Hùng Vương – Nguyễn An Ninh – Hai Bà Trưng – Cách Mạng Tháng 8-Nguyễn Trung Trực-Trương Định -Võ Văn Tần – Trà Bình Quý – Hùng Vương – QL62 – QL.N2 – TT Thạnh Hóa – ĐT 836 – QL 62 – Bãi đỗ xe Bình Hiệp</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={20} icon='mingcute:time-line' />
                                        <div className='flex-1'>5h30 – 19h00</div>
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
                            <TitleSubDetail title='Mô tả' />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                __html: `
                                    <p>bệnh viện Đa khoa – Nguyễn Thông – Châu Thị Kim – Hùng Vương – Nguyễn An Ninh – Hai Bà Trưng – Cách Mạng Tháng 8-Nguyễn Trung Trực-Trương Định -Võ Văn Tần – Trà Bình Quý – Hùng Vương – QL62 – QL.N2 – TT Thạnh Hóa – ĐT 836 – QL 62 – Bãi đỗ xe Bình Hiệp</p>
                                `}}>
                            </div>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Bản đồ' />
                            <div className="infor-map">
                                <BusMap busStops={busStops}/>
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title="Tuyến xe buýt khác" mB={2} handleClick={() => navigate('/bus-routing')} />
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