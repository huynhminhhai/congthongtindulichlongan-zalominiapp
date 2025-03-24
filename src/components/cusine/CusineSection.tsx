import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CusineItem from './CusineItem';
import { useTranslation } from 'react-i18next';

export const cusineData = [
    {
        title: 'Lẩu mắm Long An',
        desc: 'Lẩu mắm đặc sản Long An được chế biến với sự kết hợp đặc biệt từ nguồn nguyên liệu phong phú từ biển, sông, ao, hồ, và đồng ruộng.Trong lẩu mắm, ta có thể tìm thấy cá, tôm, cua, mực, heo, bò...Đồ ăn được kết hợp với một loạt các loại rau khác nhau như rau muống, giá đỗ, rau cải, dưa leo, khóm(thơm),',
        imgUrl: 'https://cdn.buffetposeidon.com/app/media/uploaded-files/110724-lau-mam-mien-tay-cung-buffet-poseidon-1-1.jpg'
    },
    {
        title: 'Canh chua cá chốt',
        desc: 'Canh chua cá chốt là một món ăn dac san Long An thưởng thức vô cùng đặc biệt, thường xuất hiện trong các bữa cơm đoàn viên và các dịp lễ hội quan trọng. Món canh chua này được chế biến từ cá chốt - một loại cá nhỏ có da trơn, thường có kích thước không quá lớn, chỉ khoảng 1kg',
        imgUrl: 'https://www.thatlangon.com/wp-content/uploads/2021/09/canh-chua-ca-tln1-e1633942511539.jpg'
    },
    {
        title: 'Gạo nàng thơm chợ Đào',
        desc: 'Gạo Nàng Thơm Chợ Đào là một loại gạo nổi tiếng và được xem là đặc sản hàng đầu của Long An. Nó có liên quan đến câu chuyện tình yêu giữa chàng Lúa và nàng Thơm tại khu chợ Đào. Gạo Nàng Thơm có hương thơm đặc trưng mà không thể so sánh với loại gạo nào khác.',
        imgUrl: 'https://cdn.tgdd.vn/Files/2022/11/18/1488658/gao-nang-thom-cho-dao-la-gi-mua-o-dau-gia-bao-nhieu-202211181548390865.jpg'
    },
    {
        title: 'Cá lóc nướng trui',
        desc: 'Người trồng vườn thường nói nhau rằng, để có một món ăn ngon và làm hài lòng mọi người, cá lóc nướng trui là sự lựa chọn hấp dẫn. Cá lóc chỉ cần được làm sạch, xếp lên que tre thành hàng dài và được phủ bằng rơm để nướng. Sự khéo léo của người nướng trui là chỉ phủ rơm một lần duy nhất. Khi rơm cháy hết, cá lóc trở nên giòn tan và vàng rực, với đuôi nhô lên trời như đang nhảy múa.',
        imgUrl: 'https://images.baoangiang.com.vn/image/media/2023/20231222/video/thumbnail/690x420/4299_img_1569.jpg'
    },
]

const CusineSection = () => {

    const { t } = useTranslation("common");
    const navigate = useNavigate()

    return (
        <Box pt={4} pb={6} className='cusine-section'>
            <Box px={4}>
                <TitleSection title={t("cusine")} handleClick={() => navigate('/cusine')} />
            </Box>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.12}
                centeredSlides={true}
                loop
            >
                {
                    cusineData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CusineItem data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}

export default CusineSection