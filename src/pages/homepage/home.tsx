import { BannerSlider } from "components/banner";
import { CusineSection } from "components/cusine";
import { DestinationSection } from "components/destination";
import { DestinationTravelSection } from "components/detination-travel";
import { Divider } from "components/divider";
import { EventsSection } from "components/events";
import { HotelSection } from "components/hotel";
import LongAnMap from "components/maps/LongAnMap";
import NewsSection from "components/news/NewsSection";
import { RestaurantSection } from "components/restaurant";
import { SearchSection } from "components/search";
import { ServiceSection, ServiceSub } from "components/services";
import { TourSection } from "components/tour";
import React, { useState } from "react";
import { useStoreApp } from "store/store";
import { Box, Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {

  const { account } = useStoreApp()

  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <Box className="relative z-[1]">
        <BannerSlider />
        <SearchSection />
        <ServiceSection setSheetVisible={setSheetVisible} />
        <Divider />
        <DestinationSection />
        <Divider />
        <DestinationTravelSection />
        <Divider />
        <CusineSection />
        <Divider />
        <NewsSection />
        <Divider />
        <EventsSection />
        <Divider />
        <TourSection />
        <Divider />
        <HotelSection />
        <Divider />
        <RestaurantSection />
        <Divider />
        <LongAnMap />
      </Box>
      <ServiceSub sheetVisible={sheetVisible} setSheetVisible={setSheetVisible} />
    </Page>
  );
};

export default HomePage;
