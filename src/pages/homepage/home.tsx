import { useGetCategoryListShowHome } from 'apiRequest/categories';
import { BannerSlider } from 'components/banner';
import { Divider } from 'components/divider';
import { SearchSection } from 'components/search';
import { ServiceSection } from 'components/services';
import TitleSection from 'components/titleSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { layoutComponentMap, SLIDE_PER_VIEW_HOMEPAGE, SLIDE_SPACE_BETWEEN_HOMEPAGE } from 'utils/constants';
import { ROUTES } from 'utils/pathRoute';
import { Box, Page } from 'zmp-ui';

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { data: categoriesList } = useGetCategoryListShowHome();
  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <Box className="relative z-[1]">
        <BannerSlider />
        <SearchSection />
        <ServiceSection />
        <Divider size={8} />

        {categoriesList &&
          categoriesList.map((cate, index) => {
            return (
              <React.Fragment key={index}>
                <Box py={4} pl={4}>
                  <Box pr={4}>
                    <TitleSection title={cate.name} handleClick={() => navigate(`/chuyen-muc/${cate.id}`)} />
                  </Box>
                  <Swiper spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE} slidesPerView={SLIDE_PER_VIEW_HOMEPAGE} loop>
                    {cate.posts.map(post => {
                      const PostComponent = layoutComponentMap[cate.zaloLayout] || layoutComponentMap['HomeNews'];
                      return (
                        <SwiperSlide key={index}>
                          <PostComponent
                            key={post.id}
                            data={post}
                            onClick={() => navigate(`${ROUTES.postDetail}/${post.id}`)}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
                {index !== categoriesList.length - 1 && <Divider size={8} />}
              </React.Fragment>
            );
          })}

        {/* <LocationSection data={DIA_DIEM_NOI_BAT_DATA} title={FeaturedPlacesTitleHome} type="dia_diem_noi_bat" />
        <Divider size={8} />
        <LocationSection data={DIA_DIEM_DU_LICH_DATA} title="Địa điểm du lịch" type="dia_diem_du_lich" />
        <Divider size={8} />
        <CusineSection />
        <Divider size={8} />
        <NewsSection data={TIN_TUC_DATA} title="Tin tức" />
        <Divider size={8} />
        <NewsSection data={SU_KIEN_DATA} title="Sự kiện" />
        <Divider size={8} />
        <TourSection />
        <Divider size={8} />
        <AccommodationSection data={HOTEL_DATA} title="Khách sạn" type="hotel" />
        <Divider size={8} />
        <AccommodationSection data={RESTAURENT_DATA} title="Nhà hàng" type="restaurent" /> */}
      </Box>
    </Page>
  );
};

export default HomePage;
