import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { destinationData } from 'components/destination/DestinationSection'
import { HeaderSub } from 'components/header-sub'
import { SingleLocationMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'

export const imagesGallery = [
    'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
    'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-9-1024x768.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
    'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tPApPFReu540fGsIOTdoHg1nm9PcK9l_rg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQbW-K2nSZpaY7Uo6J9B4RjauteSGq9PC8G7hPljfEHloZo8QEvF4qvylgXP-XI2kOvjk&usqp=CAU',
    'https://image.sggp.org.vn/w1000/Uploaded/2025/dureixrxkw/2019_02_02/nha-tram-cot_1_sggp_HJCU.jpg.webp'
]

const location = {
    lat: 10.482655336277755,
    lng: 106.69146306623148,
    name: "Nhà Trăm Cột",
    address: " Ấp Cầu Ngang, Xã Long Hựu Đông, Huyện Cần Đước, Tỉnh Long An",
    img: "https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg",
    markerImg: images.markerTravel
};

const DestinationDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết điểm đến" />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title='Nhà Trăm Cột' />
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
                                        <div className='flex-1'>Ấp Cầu Ngang, Xã Long Hựu Đông, Huyện Cần Đước, Tỉnh Long An</div>
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
                                    <div style="text-align: justify; line-height: 30px; transition: 0.7s;" className="description animate-in fadeInLeft animated" data-speed="0.7" data-show-screen="0.69">
                                        <p><strong> </strong></p>

                                        <p style="margin-left:0cm; margin-right:0cm; text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,sans-serif"><span style="font-size:14.0pt"><span style="font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">Nhà
                                                            Trăm Cột được xây dựng vào những năm 1901-1903, tại ấp Trung, xã
                                                            Long Hựu Đông, huyện Cần Đước. Nhà có diện tích
                                                            882m<sup>2</sup>, tọa lạc trên một khu vườn rộng
                                                            4.044m<sup>2</sup>, chính diện hướng Tây Bắc. Nhà được xây dựng
                                                            hoàn toàn bằng gỗ (gỗ đỏ, gỗ mật), mái lợp ngói âm dương, nền
                                                            nhà bằng đá tảng cao 0,9m, mặt nền lát gạch tàu lục giác. Nhìn
                                                            trên bình đồ, Nhà Trăm Cột có kiểu chữ quốc, 3 gian, 2 chái. Nhà
                                                            gồm có hai phần: phần phía trước được bày trí theo kiểu ngoại
                                                            khách - nội tự (ngoài tiếp khách, trong thờ tự), phần phía sau
                                                            dùng để ở và sinh hoạt.</span></span></span></span></p>

                                        <p style="margin-left:0cm; margin-right:0cm; text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,sans-serif"><span style="font-size:14.0pt"><span style="font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">Theo
                                                            các nhà nghiên cứu, Nhà Trăm Cột có kiểu thức kiến trúc thời
                                                            Nguyễn, về đại thể mang dấu ấn rõ rệt của phong cách Huế nhưng
                                                            có nhiều nét tiểu dị trong đề tài trang trí, tạo được sự phong
                                                            phú và đa dạng, phản ánh một giai đoạn lịch sử - văn hóa của
                                                            vùng đất phương Nam cuối thế kỉ XIX đầu thế kỉ
                                                            XX.</span></span></span></span></p>

                                        <p style="margin-left:0cm; margin-right:0cm; text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,sans-serif"><span style="font-size:14.0pt"><span style="font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">Nhà
                                                            Trăm Cột đã được Bộ Văn Hóa - Thông Tin xếp hạng là di tích kiến
                                                            trúc nghệ thuật quốc gia tại Quyết định số 2890-VH/QĐ ngày
                                                            27/09/1997./.</span></span></span></span></p>

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
                    <TitleSection title="Điểm đến xung quanh" mB={2} handleClick={() => navigate('/destination')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                destinationData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/destination-detail')}>
                                        <ItemDetailCard imgUrl={item.imgUrl} title={item.title} desc={'3.54km'} />
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

export default DestinationDetailPage