import { Icon } from '@iconify/react'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { SingleLocationMap } from 'components/maps'
import images from 'assets/images'
import { restaurantData } from 'components/restaurant/RestaurantSection'

export const imagesGallery = [
    'http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/765b15d8960aa09e9d17f78705256927-18833.jpeg',
    'http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/img3852-88542.jpeg',
    'http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/f4110c00572c9472cd3d26-3786.jpg',
    'http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/tbao-lich-nghi-tet-haisanhoang-1-10800.png',
    'http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/fb5ac84ce29fb79a2463759f07ad69dc-56874.jpeg'
]

const location = {
    lat: 10.630583572942681,
    lng: 106.49334510856187,
    name: "Hải sản Hoàng",
    address: "133 Đường Phan Văn Mãng, KP9, Bến Lức, Long An",
    img: "http://haisanhoang.vn/thumbs/1366x525x1/upload/photo/tbao-lich-nghi-tet-haisanhoang-1-10800.png",
    markerImg: images.markerRestaurant,
};

const HotelDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết nhà hàng" />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title='Hải sản Hoàng' />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>
                        <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>133 Đường Phan Văn Mãng, KP9, Bến Lức, Long An</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>kithuatvienbenluc@gmail.com</div>
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
                                    <p>
                                        Hải sản Hoàng Bến Lức là sự lựa chọn tốt nhất cho các sự kiện thành công tại Long An.
                                    </p>
                                    <p>
                                        Bạn đang cần dịch vụ cung cấp suất ăn? Hải sản Bến Lức là dịch vụ cung cấp ẩm thực cao cấp tại Long An với lực lượng hậu cần chuyên nghiệp và thực phẩm chất lượng. Chúng tôi sẽ làm hài lòng các yêu cầu phục vụ những buổi tiệc, buổi họp và các sự kiện khác. Chúng tôi cung cấp tất cả các món hải sản tươi sống theo yêu cầu của bạn.
                                    </p>
                                    <p>
                                        Bạn đang quan tâm và muốn Hải sản Hoàng Bến Lức phục vụ sự kiện sắp tới, vui lòng liên lạc với chúng tôi tại số điện thoại 0937377246
                                    </p>
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
                    <TitleSection title="Nhà hàng khác" mB={2} handleClick={() => navigate('/restaurant')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                restaurantData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/restaurant-detail')}>
                                        <ItemDetailCard imgUrl={item.imgUrl} title={item.title} desc={item.address} />
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

export default HotelDetailPage