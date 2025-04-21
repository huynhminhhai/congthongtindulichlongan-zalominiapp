import { Skeleton } from 'antd';
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
import {
  LAYOUT_COMPONENT_MAP,
  SLIDE_PER_VIEW_HOMEPAGE,
  SLIDE_PER_VIEWS_SECTION_HOMEPAGE,
  SLIDE_SPACE_BETWEEN_HOMEPAGE,
} from 'utils/constants';
import { ROUTES } from 'utils/pathRoute';
import { Box, Page } from 'zmp-ui';

const PostComponentSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
      {/* Skeleton cho hình ảnh */}
      <Skeleton.Image active style={{ width: '100%', height: '100%' }} className="!w-full !h-full object-cover" />

      {/* Overlay giả phần tiêu đề */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-200">
        <Skeleton.Input active size="small" style={{ width: '80%' }} className="!bg-gray-400 !h-4 !rounded-md" />
      </div>
    </div>
  );
};

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

        {categoriesList ? (
          categoriesList.map((cate, index) => {
            const gridColumn = SLIDE_PER_VIEWS_SECTION_HOMEPAGE[cate.zaloLayout] || SLIDE_PER_VIEW_HOMEPAGE;
            return (
              <React.Fragment key={index}>
                <Box py={4} pl={4}>
                  <Box pr={4}>
                    <TitleSection title={cate.name} handleClick={() => navigate(`/chuyen-muc/${cate.id}`)} />
                  </Box>
                  <Swiper spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE} slidesPerView={gridColumn} loop>
                    {cate.posts.map(post => {
                      const PostComponent = LAYOUT_COMPONENT_MAP[cate.zaloLayout] || LAYOUT_COMPONENT_MAP['Default'];
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
          })
        ) : (
          <Box py={4} pl={4}>
            <div className="mb-4">
              <Skeleton.Input active size="small" className="!bg-gray-200 !w-[150px] !h-[20px] !rounded-md" />
            </div>
            <Swiper spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE} slidesPerView={SLIDE_PER_VIEW_HOMEPAGE} loop>
              {[...Array(4)].map((_, idx) => (
                <SwiperSlide key={idx}>
                  <PostComponentSkeleton />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default HomePage;
