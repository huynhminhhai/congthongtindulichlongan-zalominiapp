import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { cusineData } from 'components/cusine/CusineSection'
import { HeaderSub } from 'components/header-sub'
import { CategoryMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { useTranslation } from 'react-i18next'

export const imagesGallery = [
    'https://www.vietfuntravel.com.vn/image/data/Mekong/dac-san-long-an-lau-mam-1.jpg',
    'https://file.hstatic.net/1000093072/file/_nh_b_a_pr_lm_grande.jpg',
    'https://www.baolongan.vn/image/news/2019/20190315/images/lau-mam-can-tho-5.jpg',
    'https://www.vietfuntravel.com.vn/image/data/Mekong/dac-san-long-an-lau-mam-2.jpg',
]

const CusineDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('cusine-detail')} />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title='Lẩu mắm Long An' />
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
                            <TitleSubDetail title={tPage('infor')} />
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
                            <TitleSubDetail title={tPage('desc')} />
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
                            <TitleSubDetail title={tPage('map')} />
                            <div className="infor-map">
                                <CategoryMap iconMarker={images.markerRestaurant} locations={[
                                    {
                                        "lat": 10.6167,
                                        "lng": 106.4167,
                                        "name": "Lẩu Mắm Sáu Tỉn",
                                        "address": "Số 23 Nguyễn Trung Trực, P.2, TP. Tân An, Long An",
                                        "img": "https://sakos.vn/wp-content/uploads/2024/09/kham-pha-lau-mam-mien-tay-dam-da-tai-sai-gon-ban-da-biet-chua-7.jpg"
                                    },
                                    {
                                        "lat": 10.5357,
                                        "lng": 106.4103,
                                        "name": "Lẩu Mắm Cô Ba",
                                        "address": "456 Quốc lộ 1A, TT. Bến Lức, Long An",
                                        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEnSH4NEat6G6C1CxQiF2Dyy_nZTRJOtFWDA&amp;s"
                                    },
                                    {
                                        "lat": 10.6427,
                                        "lng": 106.4901,
                                        "name": "Lẩu Mắm Đồng Quê",
                                        "address": "12 Đường 3/2, TT. Đức Hòa, Long An",
                                        "img": "https://lh3.googleusercontent.com/p/AF1QipMC_C1dZGQb5VUo0eLGGWUhWsPS2ZlL9M42JYUj=s1360-w1360-h1020"
                                    },
                                    {
                                        "lat": 10.6875,
                                        "lng": 106.4392,
                                        "name": "Lẩu Mắm Bà Tám",
                                        "address": "78 Trần Hưng Đạo, TT. Cần Giuộc, Long An",
                                        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaqqk5mzvKhMjJ9e1fBD0Z9RBOXfC-LCZYbQ&amp;s"
                                    },
                                    {
                                        "lat": 10.6185,
                                        "lng": 106.5317,
                                        "name": "Lẩu Mắm Hai Lúa",
                                        "address": "Số 5 Nguyễn An Ninh, TP. Tân An, Long An",
                                        "img": "https://halotravel.vn/wp-content/uploads/2021/07/logo-1-4.jpg"
                                    }
                                ]
                                } />
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
                    <TitleSection title={tPage('cusine-other')} mB={2} handleClick={() => navigate('/cusine')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                cusineData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/cusine-detail')}>
                                        <ItemDetailCard imgUrl={item.imgUrl} title={item.title} desc={'Đặc sản'} />
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

export default CusineDetailPage