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
                        <SwiperSlide key={post.id}>
                          <PostComponent data={post} onClick={() => navigate(`${ROUTES.postDetail}/${post.id}`)} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
                {index !== categoriesList.length - 1 && <Divider size={8} />}
              </React.Fragment>
            );
          })}
      </Box>
    </Page>
  );
};

export default HomePage;
