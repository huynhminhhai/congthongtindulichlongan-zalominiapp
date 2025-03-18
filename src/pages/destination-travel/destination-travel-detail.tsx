import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { destinationTravelData } from 'components/detination-travel/DestinationTravelSection'
import { HeaderSub } from 'components/header-sub'
import { SingleLocationMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import TitleSubDetail from 'components/TitleSubDetail'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'

export const imagesGallery = [
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/bangdc.lan/canhdongbattan/khudulichcanhdongbattan_1_732599852.jpg',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/bangdc.lan/canhdongbattan/kham_pha_khu_du_lich_sinh_thai_canh_dong_bat_tan_o_long_an_21593745.jpg',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/bangdc.lan/canhdongbattan/canhdongbattan_1_324758018.jpg',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/bangdc.lan/canhdongbattan/canhdongbattanlongan03_823107031.jpg',
]

const location = {
    lat: 10.72528636622164,
    lng: 106.08484848083191,
    name: "Khu du lịch Cánh Đồng Bất Tận",
    address: "Ấp Cầu Ngang, Xã Long Hựu Đông, Huyện Cần Đước, Tỉnh Long An",
    img: "https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg",
    markerImg: images.markerTravel,
};

const DestinationTravelDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết điểm du lịch" />
                <Box p={4}>
                    <Box>
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="text-[24px] font-semibold text-[#355933]">Cánh đồng bất tận</h1>
                            <div className="flex justify-end gap-3">
                                <ActionButton
                                    icon="mdi:heart"
                                    altText="Mục yêu thích"
                                    isChecked={true}
                                    onClick={() => console.log('call api favorite')}
                                />
                            </div>
                        </div>
                        <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box>
                        <Box mb={9}>

                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>KP3, Bình Phong Thạnh, Mộc Hóa, Long An, Việt Nam</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>dulichthongminh.longan@gmail.com</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='mdi-light:phone' />
                                        <div className='flex-1'>0397455789</div>
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Mô tả' />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                    __html: `
                                    <div style="text-align: justify; line-height: 30px; transition: 0.7s;" class="description animate-in fadeInLeft animated" data-speed="0.7" data-show-screen="0.69">
                                    <p>Điểm du lịch mang nét hoang sơ với những cánh rừng tràm gió, đồng cỏ bàng cùng
                                        nhiều hoạt động giúp du khách thư giãn ngoài trời.</p>

                                    <p>Nằm cách trung tâm TP HCM khoảng 80 km, khu du lịch "Cánh đồng bất tận" thuộc
                                        Trung tâm Nghiên cứu bảo tồn và phát triển dược liệu Đồng Tháp Mười, nằm tại khu
                                        phố 3, thị trấn Bình Phong Thạnh, huyện Mộc Hóa. Nơi này có hơn 1.000 ha rừng
                                        tràm gió nguyên sinh tuổi đời hàng trăm năm và một "rừng thuốc" bảo tồn hơn 80
                                        loại gene thảo mộc quý hiếm.</p>

                                </div>   
                                    
                                `}}>
                                </div>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Bản đồ' />
                            <div className="infor-map">
                                <SingleLocationMap location={location} />
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} mb={10}>
                    <CommentSection itemId={1} />
                    <ShareInfor />
                    <Rating
                        averageRating={4.2}
                        totalReviews={100}
                        ratingDistribution={{ 5: 50, 4: 30, 3: 10, 2: 5, 1: 5 }}
                        onRate={(rating) => console.log("Người dùng chọn:", rating)}
                    />
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title="Điểm du lịch xung quanh" mB={2} handleClick={() => navigate('/destination-travel')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                destinationTravelData.map((item, index) => (
                                    <Box flex className='gap-3' key={index} onClick={() => navigate('/destination-travel-detail')}>
                                        <Box>
                                            <img className='w-[120px] h-[80px] rounded-lg' src={item.imgUrl} alt={item.title} />
                                        </Box>
                                        <Box className="flex-1">
                                            <div className="text-[16px] font-semibold mb-1">{item.title}</div>
                                            <div className="text-[12px] font-medium">3,24km</div>
                                        </Box>
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

export default DestinationTravelDetailPage