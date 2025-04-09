import { AccommodationSection } from 'components/accommodation';
import { BannerSlider } from 'components/banner';
import { CusineSection } from 'components/cusine';
import { Divider } from 'components/divider';
import { LocationSection } from 'components/location';
import NewsSection from 'components/news/NewsSection';
import { SearchSection } from 'components/search';
import { ServiceSection, ServiceSub } from 'components/services';
import { TourSection } from 'components/tour';
import React, { useState } from 'react';
import { useStoreApp } from 'store/store';
import {
  DIA_DIEM_DU_LICH_DATA,
  DIA_DIEM_NOI_BAT_DATA,
  HOTEL_DATA,
  RESTAURENT_DATA,
  SU_KIEN_DATA,
  TIN_TUC_DATA,
} from 'utils/data';
import { Box, Page } from 'zmp-ui';

const HomePage: React.FunctionComponent = () => {
  const { currentLanguage } = useStoreApp();
  const { FeaturedPlacesTitleHome } = currentLanguage.value;
  console.log(currentLanguage.value);
  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <Box className="relative z-[1]">
        <BannerSlider />
        <SearchSection />
        <ServiceSection />
        <Divider size={8} />
        <LocationSection data={DIA_DIEM_NOI_BAT_DATA} title={FeaturedPlacesTitleHome} type="dia_diem_noi_bat" />
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
        <AccommodationSection data={RESTAURENT_DATA} title="Nhà hàng" type="restaurent" />
      </Box>
    </Page>
  );
};

export default HomePage;
