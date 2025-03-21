import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { HeaderSub } from 'components/header-sub'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import { tourData } from 'components/tour/TourSection'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Page, useNavigate } from 'zmp-ui'

export const imagesGallery = [
    'https://cdn.tgdd.vn/Files/2022/03/24/1421996/lang-noi-tan-lap-cam-nang-du-lich-tat-tan-tat-tu-a-z-202203240740452210.jpg',
    'https://thamhiemmekong.com/wp-content/uploads/2020/03/langnoitanlap-1.jpg',
    'https://dulichphuocthanhiv.com/wp-content/uploads/2024/09/PT_Lang-Noi-Tan-Lap-Long-An-Ve-Dep-Vung-Song-Nuoc-Tu-Nhien3.jpg',
    'https://www.sacotravel.com/wp-content/uploads/2023/08/lang-noi-tan-lap.jpg',
    'https://dulichthuduc.com.vn/vnt_upload/news/MIEN-TAY/long-an/lang_noi_tan_lap_du_lich_thu_duc_5.jpg',
]

const location = {
    lat: 10.482655336277755,
    lng: 106.69146306623148,
    name: "HOMESTAY VÀM CỎ FARMSTAY",
    address: "Đường Rạch Tre, ấp 5, xã An Thạnh, huyện Bến Lức, tỉnh Long An Tỉnh Long An",
    img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/toansauconkun994/1_647964214.jpg",
    markerImg: "https://cdn-icons-png.flaticon.com/128/3009/3009489.png",
};

const TourDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage("tours-detail")} />
                <Box px={4} pb={4}>
                    <div className="detail-container">
                        <div className="detail-body">
                            <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                                <TitleDetail title='Du lịch Long An - Khám phá làng nổi Tân Lập từ Sài Gòn' />
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
                                <TitleSubDetail title={tPage("infor")} />
                                <Box>
                                    <ul className="flex flex-col gap-3 font-medium">
                                        <li>SĐT liên hệ: 0848551554</li>
                                        <li>
                                            MÃ TOUR: HUFC7P
                                        </li>
                                        <li>
                                            Phương tiện di chuyển: Ô tô
                                        </li>
                                        <li>
                                            Thời gian: 1 Ngày
                                        </li>
                                        <li>
                                            Nơi khởi hành: TP. Hồ Chí Minh
                                        </li>
                                        <li>
                                            Ngày khởi hành: Chủ Nhật
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                            <div className="detail-body--item">
                                <TitleSubDetail title={tPage("desc")} />
                                <div className="detail-content" dangerouslySetInnerHTML={{
                                    __html: `
                                        <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description entry-content" id="tab-description" role="tabpanel" aria-labelledby="tab-title-description">
                                            <p style="text-align: center;"><strong>–o0o–</strong></p>
                                            <h2><span style="color: #000000; font-size: 90%;"><strong>BUỔI SÁNG: TP. HỒ CHÍ MINH
                                                        – MỘC HOÁ&nbsp; </strong>(Ăn Sáng, Trưa)</span></h2>
                                            <p><strong>06h00</strong><strong>:&nbsp;&nbsp; </strong><strong>HDV META Event &amp;
                                                    Travel</strong> đón khách tại điểm hẹn và bắt đầu hành trình đi <strong><a href="https://vi.wikipedia.org/wiki/M%E1%BB%99c_H%C3%B3a" rel="nofollow noopener" target="_blank">Mộc Hoá</a>.</strong></p>
                                            <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </strong>Dừng chân ăn sáng, sau đó quý khách di chuyển bằng vỏ lãi vào khu trung
                                                tâm tham quan:</p>
                                            <ul>
                                                <li><strong>Cánh đồng cỏ bàng</strong>– từng là phim trường của bộ phim Cánh
                                                    Đồng Bất Tận</li>
                                                <li><strong>Cánh đồng dược liệu Sao Mai</strong>– Đây là khu bảo tồn nguồn gene
                                                    của Đồng Tháp Mười</li>
                                                <li><strong>Nhà máy Mộc Hoa Tràm</strong>– nơi sản xuất các sản phẩm dược liệu
                                                    từ thiên nhiên như tinh dầu, mỹ phẩm, thực phẩm chức năng, đông dược</li>
                                            </ul>
                                            <p><strong>Trưa: &nbsp;&nbsp;&nbsp;&nbsp; </strong>Quý khách ăn trưa và nghỉ ngơi
                                                tại khu trung tâm của KDL.</p>
                                            <h2><span style="color: #000000; font-size: 90%;"><strong>BUỔI CHIỀU: TRỞ VỀ TP. HỒ
                                                        CHÍ MINH</strong></span></h2>
                                            <p><strong>Chiều:&nbsp; &nbsp;</strong>Quý khách tham gia chương trình:</p>
                                            <ul>
                                                <li><strong>Trekking, chạy bộ, đạp xe thăm rừng với cung đường 13km.</strong>
                                                </li>
                                                <li><strong>Chèo xuồng kayak, xuồng composite</strong></li>
                                                <li><strong>Bơi lội, lặn ngắm thảm thực vật tại hồ nước mưa</strong></li>
                                            </ul>
                                            <p>Sau đó, Xe đưa đoàn di chuyển về lại TP.HCM. Kết thúc chuyến tham quan.
                                                <strong>HDV <a href="https://metaeventtravel.vn/">META Event &amp;
                                                        Travel</a></strong> chia tay và hẹn gặp lại quý khách trong những <a href="https://metaeventtravel.vn/tour-du-lich-long-an"><strong>Tour Long
                                                        An</strong></a> khác.</p>
                                            <p style="text-align: center;"><strong>–o0o–</strong></p>
                                            
                                        </div>
                                    `}}>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <TitleSection title={tPage("tours-others")} mB={2} handleClick={() => navigate('/tour')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                tourData.map((item, index) => (
                                    <Box flex className='gap-3' key={index} onClick={() => navigate('/tour-detail')}>
                                        <ItemDetailCard imgUrl={item.imgUrl} title={item.title} desc={`${item.place} địa điểm - ${item.date} ngày`} />
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

export default TourDetailPage