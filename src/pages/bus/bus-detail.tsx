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
import { busData } from './bus'
import { useTranslation } from 'react-i18next'

const location = {
    lat: 10.537824636906599,
    lng: 106.40475073924593,
    name: "Bến xe Long An",
    address: "  Số 113, QL1, P2, TP Tân An, Long An",
    img: "https://www.zappiamotors.com/wp-content/uploads/2024/02/ben-xe-long-an-cung-cap-thuc-an-nhanh-va-nuoc-giai-khat.jpg",
    markerImg: images.markerBus,
};

const BusDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('bus-stop-detail')} />
                <Box>
                    {/* <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box> */}
                    <Box p={4}>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between' className='gap-2'>
                            <TitleDetail title={location.name} />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>
                        <Box mb={9}>
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-2'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>{location.address}</div>
                                    </li>
                                    {/* <li className='flex items-start gap-2'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>sanhafood.longan@gmail.com</div>
                                    </li>
                                    <li className='flex items-start gap-2'>
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
                                    <p>
                                    <img src="https://motortrip.vn/wp-content/uploads/2025/01/Ben-xe-Tan-An-Long-An-6.jpg" alt="">
                                </p>
                                        <p>Bến xe Long An là một bến xe khách quan trọng nhất của Thành phố Long An.</p>
                                        <p>Bến xe khách nàylà đầu mối giao thông quan trọng kết nối giữa Sài Gòn và các tỉnh
                                    miền Tây. Bến xe Long An phục vụ hành khách đến thành phố Hồ Chí Minh hoặc đi các
                                    tỉnh đồng bằng Sông Cửu Long. Hiện nay có hơn 80 doanh nghiệp vận tải tham gia khai
                                    thác 200 tuyến đường thuộc các tỉnh: Tiền Giang, Vĩnh Long, An Giang, Hậu Giang,
                                    Đồng Tháp, Bạc Liêu, Cà Mau, Kiên Giang, Sóc Trăng, Cần Thơ, Trà Vinh, Bến Tre,… mỗi
                                    ngày tiếp nhận nghìn lượt hành đi xe</p>
                                    <p>
                                    Không những vậy có nhiều nhà xe đưa quý khách ra tận ngoài bắc như Hà Nội, Bắc
                                    Ninh... cho khách có nhu cầu.
                                </p>
                                `}}>
                            </div>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('map')} />
                            <div className="infor-map">
                                <SingleLocationMap location={location} />
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title={tPage('bus-stop-others')} mB={2} handleClick={() => navigate('/bus')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                busData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/bus-detail')}>
                                        <ItemDetailCard imgUrl={item.img} title={item.name} desc={item.address} />
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

export default BusDetailPage