import { useGetNewsList } from 'apiRequest/news';
import images from 'assets/images';
import { NewsSectionSkeleton } from 'components/skeleton';
import TitleSection from 'components/titleSection';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, useNavigate } from 'zmp-ui';

import 'swiper/css';

import { useTranslation } from 'react-i18next';
import { SLIDE_PER_VIEW_HOMEPAGE, SLIDE_SPACE_BETWEEN_HOMEPAGE } from 'utils/constants';

import NewsItem from './NewsItem';

const initParam = {
  page: 1,
  pageSize: 5,
};

const NewsSection: React.FC<any> = ({ data, title, on }) => {
  const [param, setParam] = useState(initParam);
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  // const { data, isLoading } = useGetNewsList(param)

  // const listData =
  //   data?.pages.reduce((acc, page) => [...acc, ...page], []) || []

  // if (isLoading) {
  //   return <NewsSectionSkeleton count={1} />
  // }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Box py={6} pl={4} className="news-section">
            <Box pr={4}>
              <TitleSection title={title || 'Tin tức'} handleClick={() => navigate('/news')} />
            </Box>
            <Swiper spaceBetween={SLIDE_SPACE_BETWEEN_HOMEPAGE} slidesPerView={SLIDE_PER_VIEW_HOMEPAGE} loop>
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <NewsItem data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewsSection;
