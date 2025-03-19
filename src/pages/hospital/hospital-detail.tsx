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
import { medicalData } from './hospital'

export const imagesGallery = [
    'https://ttytbenluc.com.vn/wp-content/uploads/2024/04/11-715x400.png',
    'https://media.la34.com.vn/upload/image/202502/medium/1318870_ngay_21_2_2025_ben_luc_trung_tam_y_te_huyen_xung_dang_la_la_co_dau_cua_trong_cong_tac_cham_soc_suc_khoe_nhan_dan_hinh_2_09292521.jpg',
    'https://media.la34.com.vn/upload/image/202502/medium/1318868_ngay_21_2_2025_ben_luc_trung_tam_y_te_huyen_xung_dang_la_la_co_dau_cua_trong_cong_tac_cham_soc_suc_khoe_nhan_dan_hinh_10_09271021.jpg',
]

const location = {
    lat: 10.640914341633634,
    lng: 106.48684143342535,
    name: "Trung tâm Y tế huyện Bến Lức",
    address: "126 Nguyễn Hữu Thọ- KP3- TTBL- Bến Lức – Long An",
    img: "https://media.la34.com.vn/upload/image/202502/medium/1318868_ngay_21_2_2025_ben_luc_trung_tam_y_te_huyen_xung_dang_la_la_co_dau_cua_trong_cong_tac_cham_soc_suc_khoe_nhan_dan_hinh_10_09271021.jpg",
    markerImg: images.markerHospital,
};


const HospitalDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết cơ sở y tế" />
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
                        <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>{location.address}</div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>ttytbenluc@longan.gov.vn</div>
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
                                <div class="ExternalClassFCD6FB87A52E4388B8304B8249402EC2"><p style="text-align:justify;"><strong>I- Thông tin chung:</strong></p><p style="text-align:justify;">1- Tên đơn vị (chữ HOA): TRUNG TÂM Y TẾ HUYỆN BẾN LỨC</p><p style="text-align:justify;">2- Địa chỉ: 126 Nguyễn Hữu Thọ- KP3- TTBL- Bến Lức – Long An</p><p style="text-align:justify;">3- Điện thọai: 0723 871 480&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fax:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0723 891 100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p><p style="text-align:justify;">4- Cơ quan chủ quản: SỞ Y TẾ LONG AN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p><p style="text-align:justify;">5-Email: ttytbenluc@longan.gov.vn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p><p style="text-align:justify;"><strong>II- Thông tin riêng: </strong></p><p style="text-align:justify;"><strong>1- Lãnh đạo bệnh viện</strong>:</p><p style="text-align:justify;">Giám đốc:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phạm Hồng Thái</p><p style="text-align:justify;">Phó Giám đốc:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nguyễn Văn Đấu</p><p style="text-align:justify;">Phó Giám dốc:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phan Tấn Thanh​​</p><p style="text-align:justify;"><strong>2- Cơ cấu tổ chức đơn vị: </strong></p><p style="text-align:justify;"><strong>2.1 Sơ đồ tổ chức đơn vị: ( Kèm sơ đồ)</strong></p><p style="text-align:justify;"><strong>2.2</strong> Quy mô đơn vị (nếu là bệnh viện hoặc TTYT có giường bệnh)</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Bệnh viện đa khoa (chuyên khoa) hạng: III</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Tổng số giường bệnh: 160 giường bệnh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p><p style="text-align:justify;"><strong>2.3</strong> Cơ cấu nhân lực: </p><p style="text-align:justify;">Tổng số CBCCVC: 321, trong đó:</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Tiến sĩ Y:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Thạc sĩ Y:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;01</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Thạc sĩ điện:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;01</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Bác sĩ:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;32</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Bác sĩ CK1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;26</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Bác sĩ CK2:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Tiến sĩ Dược:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Thạc sĩ Dược:&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Dược sĩ đại học: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Dược sĩ CK1:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Dược sĩ CK2:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Y sĩ:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;91</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - KTV Y đại học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;03</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - KTV Y trung học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;04</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - DS trung học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;23</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - KTV trung học dược: &nbsp;00</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Y tá điều dưỡng đại học: 08</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Y tá điều dưỡng trung học:&nbsp;&nbsp;&nbsp;51</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - NHS đại học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - NHS trung học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;32</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Đại học khác:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;07</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Cao đẳng khác:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;05</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Trung học khác:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;07</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Sơ học, cán bộ khác:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20</p><p style="text-align:justify;"><strong>3. Vị trí, chức năng, nhiệm vụ của đơn vị: </strong></p><p style="text-align:justify;">Trung tâm Y tế Bến Lức giáp ranh Thành phố Hồ Chí Minh, có 2 chức năng khám điều trị và thực hiện các chương trình y tế quốc gia, y tế dự phòng. </p><p style="text-align:justify;"><strong>3.1. Chức năng:</strong></p><p style="text-align:justify;">Trung tâm Y tế huyện Bến Lức chịu sự chỉ đạo và quản lý trực tiếp, toàn diện của UBND huyện Bến Lức, đồng thời chịu sự hướng dẫn về nghiệp vụ chuyên môn theo ngành của Sở Y tế.</p><p style="text-align:justify;">Trung tâm Y tế huyện Bến Lức có chức năng khám chữa bệnh, thực hiện các chương chương trình quốc gia về y tế, hướng dẫn các hoạt động thuộc lĩnh vực được giao theo đúng chính sách, pháp luật, các quy định của Nhà nước.</p><p><strong>3.2. Nhiệm vụ:</strong><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Xây dựng kế hoạch, chương trình và các giải pháp thực hiện công tác chăm sóc sức khỏe nhân dân trên địa bàn huyện Bến Lức và tổ chức triển khai thực hiện theo sự chỉ đạo và hướng dẫn của Sở Y tế và UBND huyện Bến Lức.</p><p style="text-align:justify;">Khám chữa bệnh, cấp cứu, thực hiện các chương trình quốc gia về y tế, dự phòng, kết hợp y học hiện đại với y học cổ truyền dân tộc, tiêm chủng, phòng chống dịch bệnh, phòng chống sốt rét, bướu cổ, quản lý thai sản, bảo vệ sức khỏe bà mẹ, trẻ em và nhiệm vụ chuyên môn, kỹ thuật về kế hoạch hóa gia đình trên địa bàn nhằm làm tốt công tác chăm sóc và bảo vệ sức khỏe nhân dân, đặc biệt là nhiệm vụ chăm sóc sức khỏe ban đầu theo quy định của ngành Y tế.</p><p style="text-align:justify;">Thực hiện tốt, nâng cao chất lượng&nbsp; tiêu chí quốc gia huyện-xã.</p><p style="text-align:justify;">Quản lý tốt tổ chức bộ máy, cán bộ, kinh phí, dược, vật tư trang thiết bị y tế tuyến huyện và tuyến xã.</p><p style="text-align:justify;">Xây dựng, củng cố mạng lưới y tế và hướng dẫn, kiểm tra các mặt hoạt động chuyên môn, nghiệp vụ đối với các Trạm y tế xã.</p><p style="text-align:justify;">Chủ trì phối hợp với các Ngành, Đoàn thể trong huyện thực hiện công tác truyền thông giáo dục sức khỏe và tham gia vào các hoạt động chăm sóc, bảo vệ sức khỏe nhân dân.</p><p style="text-align:justify;">Thực hiện những nhiệm vụ, quyền hạn khác do Uỷ ban nhân dân huyện giao và hướng dẫn của Sở Y tế.</p><p style="text-align:justify;"><strong>4. Quy mô, năng lực, trang thiết bị:</strong></p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Kể tên các phòng, các khoa (nếu có) của đơn vị và số giường bệnh tại mỗi khoa (nếu có): 160 giường bệnh.</p><table cellspacing="0" width="100%" class="ms-rteTable-default"><tbody><tr><td class="ms-rteTable-default" style="width:20%;"><strong>STT</strong></td><td class="ms-rteTable-default" style="width:20%;"><strong>KHOA/PHÒNG</strong></td><td class="ms-rteTable-default" style="width:20%;"><strong>Chỉ tiêu giường bệnh</strong></td><td class="ms-rteTable-default" style="width:20%;"><strong>Chỉ tiêu </strong><strong>&nbsp;</strong><strong>hiện phấn đấu</strong></td><td class="ms-rteTable-default" style="width:20%;"><strong>Ghi chú</strong></td></tr><tr><td class="ms-rteTable-default">1</td><td class="ms-rteTable-default">Cấp cứu</td><td class="ms-rteTable-default">5</td><td class="ms-rteTable-default">5</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">2</td><td class="ms-rteTable-default">Nội</td><td class="ms-rteTable-default">60</td><td class="ms-rteTable-default">65</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">3</td><td class="ms-rteTable-default">Nhi</td><td class="ms-rteTable-default">30</td><td class="ms-rteTable-default">35</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">4</td><td class="ms-rteTable-default">Nhiễm</td><td class="ms-rteTable-default">15</td><td class="ms-rteTable-default">15</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">5</td><td class="ms-rteTable-default">Ngoại</td><td class="ms-rteTable-default">15</td><td class="ms-rteTable-default">17</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">6</td><td class="ms-rteTable-default">Sản</td><td class="ms-rteTable-default">20</td><td class="ms-rteTable-default">25</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">7</td><td class="ms-rteTable-default">Đông Y</td><td class="ms-rteTable-default">15</td><td class="ms-rteTable-default">18</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">8</td><td class="ms-rteTable-default">Phòng khám KVGĐ</td><td class="ms-rteTable-default">25</td><td class="ms-rteTable-default">25</td><td class="ms-rteTable-default">&nbsp;</td></tr><tr><td class="ms-rteTable-default">&nbsp;</td><td class="ms-rteTable-default"><strong>Tổng cộng:</strong></td><td class="ms-rteTable-default"><strong>185</strong></td><td class="ms-rteTable-default"><strong>205</strong></td><td class="ms-rteTable-default">&nbsp;</td></tr></tbody></table><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Giới thiệu về các phương pháp điều trị, chẩn đoán, máy móc trang thiết bị hiện có phục vụ khám chữa bệnh, xét nghiệm tại đơn vị:</p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Siêu âm 3D, 4D, Xquang cố định, tại giường, xét nghiệm sinh hóa, khí máu động mạch…</p><p style="text-align:justify;"><strong>5. Các hoạt động, thành tích nổi bật và các hình thức khen thưởng của bệnh viện: </strong></p><p style="text-align:justify;">- Giới thiệu một số hoạt động chuyên môn nổi bật thời gian qua trên từng lĩnh vực của đơn vị phụ trách (có thể cung cấp môt số hình ảnh minh hoạ) </p><p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Thành tích thời gian qua: Danh hiệu anh hùng, thầy thuốc ưu tú, Huân chương, Huy chương, Cờ thi đua, Bằng khen của các cấp... </p><p style="text-align:justify;"><strong>6. Định hướng phát triển của đơn vị thời gian tới: </strong>(về tổ chức, cơ sở vật chất, lĩnh vực phụ trách, trang thiết bị, đào tạo nguồn lực....)</p><p style="text-align:justify;">- Về tổ chức: Trung tâm nâng cao công suất sử dụng giường bệnh từ 160 giường lên 200 giường bệnh.</p><p style="text-align:justify;">- Về cơ sở vật chất: Cơ sở vật chất được xây dựng mới đã được đưa vào sử dụng các khối, khoa/phòng chức năng như khu khám bệnh áp dụng phần mềm trong việc quản lý khám chữa bệnh, khu mổ đi vào hoạt động, khu cấp cứu tổng hợp, chạy thận nhân tạo…</p><p style="text-align:justify;">- Về trang thiết bị: Đưa vào sử dụng chụp CT Scaner, phòng công nghệ thông tin mạng lưới vi tính hóa-Internet…</p><p style="text-align:justify;">- Về đào tạo: Đưa cán bộ đi đào tạo các chuyên khoa như ngoại sản, da liểu, Nội-Nhi, và các lớp sơ bộ khác nhằm đáp ứng nhu cầu phát triển chuyên môn của đơn vị. Tuy nhiên cần bổ sung thêm nguồn nhân lực y tế để đảm bảo phục vụ so với chỉ tiêu giường bệnh.</p><p style="text-align:justify;">- Nâng cao chất lượng bệnh viện đạt mức &gt; 3 theo tiêu chí của Bộ y tế.</p><p style="text-align:justify;">- Xây dựng và cũng cố các trạm y tế thực hiện bộ tiêu chí quốc gia xề y tế xã.</p><p style="text-align:justify;">- Triển khai và thực hiện tốt các chương trình mục tiêu y tế quốc gia.​</p></div>
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
                <Box px={4} pb={4}>
                    <TitleSection title="Điểm mua sắm khác" mB={2} handleClick={() => navigate('/hospital')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                medicalData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/hospital-detail')}>
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

export default HospitalDetailPage