import React from "react"
import { Box, Swiper } from "zmp-ui"

const BannerSlider: React.FC = () => {

    return (
        <Box className="banner-silder">
            <Box
                flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                className="bg-[#f5f5f5]"
            >
                <Swiper
                    loop
                    duration={12000}
                    // autoplay
                    className="!rounded-none h-[250px]"
                >
                    <Swiper.Slide className="h-fit">
                        <Box px={3} py={4} className="relative">
                            <img className="absolute left-[65%] top-[0] w-[70%] h-auto translate-x-[-15%] translate-y-[5%]" src="https://pngimg.com/d/world_map_PNG28.png" alt="shape-map" />
                            <h1 className="text-[32px] leading-[38px] text-[#000] font-bold mb-1">
                                <div>KHÁM PHÁ</div>
                                <div>DU LỊCH</div>
                                <div>TỈNH <span className="text-[#355933]">LONG AN</span></div>
                            </h1>
                            <p className="whitespace-normal font-medium">
                                Khám phá Long An – Vùng đất giao thoa giữa thiên nhiên tươi đẹp, văn hóa đặc sắc và ẩm thực độc đáo. Tận hưởng những điểm đến hấp dẫn, tham gia các lễ hội sôi động và trải nghiệm du lịch đầy thú vị tại Long An!
                            </p>
                        </Box>
                    </Swiper.Slide>
                    <Swiper.Slide className="h-fit">
                            <img
                                className="w-full h-full object-cover"
                                src='https://vinhtour.vn/wp-content/uploads/2024/09/VT_Khu-Du-Lich-Canh-Dong-Bat-Tan-Long-An-Ve-Dep-Moc-Mac-Dam-Chat-Tay-Nam-Bo1.jpg'
                                alt='banner'
                            />
                    </Swiper.Slide>
                    <Swiper.Slide className="h-fit">
                            <img
                                className="w-full h-full object-cover"
                                src='https://ik.imagekit.io/tvlk/blog/2022/12/dia-diem-du-lich-long-an-3.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2'
                                alt='banner'
                            />
                    </Swiper.Slide>
                    <Swiper.Slide className="h-fit">
                            <img
                                className="w-full h-full object-cover"
                                src='https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/dia-diem-du-lich-long-an-1.jpg'
                                alt='banner'
                            />
                    </Swiper.Slide>
                </Swiper>
            </Box>
        </Box>
    )
}

export default BannerSlider