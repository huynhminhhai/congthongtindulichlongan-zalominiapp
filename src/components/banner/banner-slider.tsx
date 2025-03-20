import React from "react"
import { useTranslation } from "react-i18next";
import { Box, Swiper } from "zmp-ui"

const BannerSlider: React.FC = () => {
    const { t } = useTranslation("home");

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
                    className="!rounded-none h-[270px]"
                >
                    <Swiper.Slide className="h-fit">
                        <Box px={3} py={4} className="relative">
                            <img className="absolute left-[65%] top-[0] w-[70%] h-auto translate-x-[-15%] translate-y-[5%]" src="https://pngimg.com/d/world_map_PNG28.png" alt="shape-map" />
                            <h1 className="text-[32px] leading-[38px] text-[#000] font-bold mb-1">
                                <div>{t("welcome1")}</div>
                                <div>{t("welcome2")}</div>
                                <div>{t("welcome3")} <span className="text-[#355933]">LONG AN</span></div>
                            </h1>
                            <p className="whitespace-normal font-medium">
                                {t("discoveryDesc")}
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