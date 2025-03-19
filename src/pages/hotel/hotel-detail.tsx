import { Icon } from '@iconify/react'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { SingleLocationMap } from 'components/maps'
import { hotelData } from 'components/hotel/HotelSection'
import images from 'assets/images'

export const imagesGallery = [
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/dam_sen_vamcofarmstay_584108114.png',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/toansauconkun994/1_647964214.jpg',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/homestay_vamcofarmstay_13_56952635.png',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/homestay_vamcofarmstay_4_381296712.png',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/homestay_vamcofarmstay_11_840781801.png',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/ho_boi_vamcofarmstay_2_377571207.png',
    'https://scontent.iocvnpt.com/resources/portal//Images/LAN/vamcofarmstay/hinh_anh_homestay/homestay_vamcofarmstay_16_663281182.png'
]

const location = {
    lat: 10.482655336277755,
    lng: 106.69146306623148,
    name: "HOMESTAY VÀM CỎ FARMSTAY",
    address: "Đường Rạch Tre, ấp 5, xã An Thạnh, huyện Bến Lức, tỉnh Long An",
    img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/toansauconkun994/1_647964214.jpg",
    markerImg: images.markerHotel,
};

const HotelDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết lưu trú" />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title='HOMESTAY VÀM CỎ FARMSTAY' />
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
                                        <div className='flex-1'>Đường Rạch Tre, ấp 5, xã An Thạnh, huyện Bến Lức, tỉnh Long An Tỉnh Long An</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>cskh@vamcofarmstay.com</div>
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
                                    <div class="hotel-description-policy">
                                    <p><strong>CTY CP DỊCH VỤ THƯƠNG MẠI DU LỊCH PHÚ QUÝ</strong></p>

                                    <p><strong>Khu Du Lịch Sinh Thái Vàm Cỏ</strong> và nhà hàng Vàm Cỏ được lấy cảm
                                        hứng và bắt nguồn từ con sông Vàm Cỏ Đông thơ mộng uốn lượn chảy quanh địa bàn
                                        các huyện Đức Hòa, Đức Huệ, Bến Lức, Cần Đước của tỉnh Long An. Do đó, sông Vàm
                                        Cỏ không những là sông mẹ chất chứa phù sa nuôi sống biết bao thế hệ mà nó còn
                                        là con sông gắn liền với tuổi thơ của biết bao người trong đó có những người con
                                        Long An sáng lập lên Khu Du Lịch Sinh Thái Vàm Cỏ này với mong muốn đóng góp một
                                        chút công sức và trí tuệ bản thân vào sự phát triển của địa phương và tạo ra các
                                        giá trị hữu ích cho cộng đồng. Đó là lý do mà Vàm Cỏ Farmstay ra đời.</p>

                                    <p><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/song_vam_co_tay_856179579.jpg" style="heigth:undefinedpx; width:1024px"></p>

                                    <p>Với mong ước và sứ mệnh đó, định hướng phát triển của Vàm Cỏ là trở thành Khu Du
                                        Lịch Sinh Thái kết hợp với các hoạt động du lịch sông nước và trải nghiệm du
                                        lịch nông nghiệp: tham quan nông trại, vườn trái cây, tự mình thể nghiệm bằng
                                        cách tham gia vào các hoạt động canh tác của người nông dân địa phương. Để phục
                                        vụ cho định hướng phát triển đó Vàm Cỏ Farmstay tập trung đẩy mạnh vào các dịch
                                        vụ nhằm đáp ứng nhu cầu ăn uống, nghỉ ngơi của du khách trước khi tham gia vào
                                        các hoạt động trải nghiệm du lịch sông nước như:</p>

                                    <p>•Nhà hàng ẩm thực Vàm Cỏ chuyên các món đồng quê dân dã, các món đồ rừng đặc sắc
                                        và các món hải sản tươi sống.</p>

                                    <p>•Homestay lưu trú với sự đầu tư bài bản, cơ sở vật chất đáp ứng tiêu chuẩn khách
                                        sạn 3 sao, hoặc quý khách có thể trải nghiệm không gian sống thôn quê dân dã
                                        bằng cách book nguyên chiếc thuyền nổi trên đầm sen, vừa thoáng đãng lại vừa gần
                                        gũi thiên nhiên.</p>

                                    <p>•Khu camping sát bờ sông.</p>

                                    <p>•Dịch vụ câu cá giải trí.</p>

                                    <p>•Du lịch sinh thái sông nước như: chèo xuồng ba lá đi hái bần, hái dừa nước. Chèo
                                        thuyền sub trên sông, tham quan nông trại, tham quan vườn trái cây, tour ẩm thực
                                        trên sông kết hợp với thưởng thức đờn ca tài tử…</p>

                                    <p><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/don_ca_tai_tu_489548122.png" style="heigth:undefinedpx; width:1124px"><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/cheo_thuyen_tren_song_tai_vamcofarmstay_592411100.png" style="heigth:undefinedpx; width:1124px"><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/bbq3_134256834.png" style="heigth:undefinedpx; width:1124px"><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/bbq_81918054.png" style="heigth:undefinedpx; width:1124px"></p>

                                    <p>Với khoảng cách địa lý chỉ cách Tp HCM 25km, mất từ 30-45 phút di chuyển mà cảnh
                                        quan lại mang đậm nét dân dã miền tây như: đồng lúa, ao sen, rặng dừa nước, rặng
                                        bần ven sông. Vàm Cỏ là điểm đến lý tưởng cho các gia đình hoặc nhóm bạn trẻ
                                        muốn đi du lịch trải nghiệm trong ngày hoặc ở lại một đêm.</p>

                                    <p><img alt="" src="https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/compress/ban_do_duong_di_den_vamcofarmstay_608656059.png" style="heigth:undefinedpx; width:1124px"></p>

                                    <p>Xa rời phố thị đông đúc. Quý khách sẽ được hòa mình với thiên nhiên, sống lại
                                        những ký ức tuổi thơ đã từng trải qua hoặc giúp thế hệ trẻ hiểu được khái niệm
                                        và giá trị sống của thế hệ cha ông đi trước.</p>

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
                    <TitleSection title="Lưu trú khác" mB={2} handleClick={() => navigate('/hotel')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                hotelData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/hotel-detail')}>
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