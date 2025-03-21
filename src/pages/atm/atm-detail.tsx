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
import { atmData } from './atm'
import { useTranslation } from 'react-i18next'

export const imagesGallery = [
    'https://nhadatlongan.net.vn/wp-content/uploads/2024/02/AF1QipPjR5MrOMnAVaRRSgEIWTpLdebE7IerBWjb3gYNs1289-k-no-e1708750503502.jpeg',
    'https://www.baolongan.vn/image/news/2022/20220802/images/ben-luc-2.jpg',
    'https://i.ytimg.com/vi/_qg1kYG2ars/maxresdefault.jpg',
]

const location = {
    lat: 10.545543877042537,
    lng: 106.4014774649973,
    name: "ATM Vietcombank Tân Long An",
    address: "85-91 Đ. Hùng Vương, phường 6, Tân An, Long An, Việt Nam",
    img: "https://cdn.haitrieu.com/wp-content/uploads/2023/07/co-ngan-hang-vietcombank-350x233.png",
    markerImg: images.markerAtm,
};

const AtmDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('atm-detail')} />
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
                                        <div className='flex-1'>{location.address}</div>
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
                        {/* <Box mb={9}>
                            <TitleSubDetail title='Mô tả' />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                __html: `
                                    <p>
                                    Chợ Bến Lức trực thuộc huyện Bến Lức nằm phía Đông Bắc của tỉnh Long An, là cửa ngõ phía Bắc của miền Tây Nam Bộ, cách trung tâm TP.HCM khoảng 30km về hướng Tây Nam và cách TP Tân An 15km về hướng Đông Bắc, có vị trí địa lý:
                                </p>
                                        <p>
                                        <ul>
                                        <li>Phía Bắc giáp Đức Hoà, Đức Huệ.</li>
                                        <li>Phía Nam giáp Cần Giuộc, Cần Đước, Tân Trụ.</li>
                                        <li>Phía Đông giáp Bình Chánh.</li>
                                        <li>Phía Tây giáp Thủ Thừa.</li>
                                    </ul>
                                    </p>
                                       <p>
                                    Chợ Bến Lức nằm ở xã Bến Lức, huyện Bến Lức, tỉnh Long An, miền Tây Nam Bộ. Đây là một trong những điểm thương mại truyền thống quan trọng của huyện và là nơi tập trung giao thương và mua bán hàng hóa của người dân trong và ngoài địa phương.
                                </p>
                                <p><img src="https://nhadatlongan.net.vn/wp-content/uploads/2024/02/AF1QipP2UIuUNOB3hHpXW_3GNqMzyFzR3TzUPFg2PK4s901-k-no.jpeg?v=1708750531" alt=""></p>
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
                        </Box> */}
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('map')} />
                            <div className="infor-map">
                                <SingleLocationMap location={location} />
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title={tPage('gallery-others')} mB={2} handleClick={() => navigate('/market')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                atmData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/market-detail')}>
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

export default AtmDetailPage