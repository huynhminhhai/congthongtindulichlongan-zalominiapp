import { HeaderSub } from 'components/HeaderSub';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Page, useParams } from 'zmp-ui';

import 'swiper/css';
import 'swiper/css/pagination';

import { useGetAlbumsDetail } from 'apiRequest/album';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'swiper/modules';
import { formatImageSrc } from 'utils';

const GalleryDetailPage = () => {
  const { id } = useParams();
  const { t: tPage } = useTranslation('page');
  const { data: imagesGallery } = useGetAlbumsDetail(Number(id));
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={tPage('gallery-detail')} />
        <div className="bg-[rgba(0,0,0,0.8)] h-[calc(100vh-56px)] flex flex-col items-center justify-center">
          <Swiper
            spaceBetween={10}
            loop
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mb-4 max-w-[360px] h-auto object-contain"
          >
            {imagesGallery &&
              imagesGallery.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={formatImageSrc(item.image)} alt={item.name} className="w-full h-full object-contain" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Box>
    </Page>
  );
};

export default GalleryDetailPage;
