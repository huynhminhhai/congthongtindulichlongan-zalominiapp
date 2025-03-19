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
import { guides } from './guide'

export const imagesGallery = [
    'https://www.vietfuntravel.com.vn/image/data/Mekong/dac-san-long-an-lau-mam-1.jpg',
    'https://file.hstatic.net/1000093072/file/_nh_b_a_pr_lm_grande.jpg',
    'https://www.baolongan.vn/image/news/2019/20190315/images/lau-mam-can-tho-5.jpg',
    'https://www.vietfuntravel.com.vn/image/data/Mekong/dac-san-long-an-lau-mam-2.jpg',
]

const GuideDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết hướng dẫn viên" />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title='Nguyễn Văn Nam' />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>
                        <Box mb={9}>
                            <img src="https://vcdn1-dulich.vnecdn.net/2019/06/26/DSC1077-1561521306-5685-1561524976.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LwRQwSOWFP6j3s6L3RXusw" alt="ssd" />
                        </Box>
                        {/* <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box> */}
                        <Box mb={9}>
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li>
                                        Số điện thoại: 0901234567
                                    </li>
                                    <li>
                                        Email: nam.nguyen@example.com
                                    </li>
                                    <li>
                                        Kinh nghiệm: 5 năm
                                    </li>
                                    <li>
                                        Ngoại ngữ: Tiếng Anh, Tiếng Trung
                                    </li>
                                    <li>
                                        Chuyên môn: Tour sinh thái, Tour văn hóa
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Mô tả' />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                    __html: `
                                    <p>Tôi là Nguyễn Văn Nam, hướng dẫn viên du lịch chuyên nghiệp với hơn 5 năm kinh nghiệm dẫn tour trong và ngoài nước. Am hiểu sâu sắc về văn hóa, lịch sử Việt Nam và đặc biệt có niềm đam mê khám phá, chia sẻ những câu chuyện thú vị với du khách. Sự nhiệt tình, chu đáo và khả năng xử lý tình huống linh hoạt chính là điểm mạnh giúp tôi luôn mang đến những chuyến đi trọn vẹn và đáng nhớ.</p>
                                `}}>
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title="Hướng dẫn viên khác" mB={2} handleClick={() => navigate('/guide')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                guides.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/guide-detail')}>
                                        <ItemDetailCard imgUrl={item.img} title={item.name} desc={item.place} />
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

export default GuideDetailPage