import { BannerSlider } from 'components/banner'
import { CusineSection } from 'components/cusine'
import { DestinationSection } from 'components/destination'
import { DestinationTravelSection } from 'components/destination-travel'
import { Divider } from 'components/divider'
import { EventsSection } from 'components/events'
import { AccommodationSection } from 'components/accommodation'
import NewsSection from 'components/news/NewsSection'
import { SearchSection } from 'components/search'
import { ServiceSection, ServiceSub } from 'components/services'
import { TourSection } from 'components/tour'
import React, { useState } from 'react'
import { useStoreApp } from 'store/store'
import { HOTEL_DATA, RESTAURENT_DATA } from 'utils/data'
import { Box, Page } from 'zmp-ui'

const HomePage: React.FunctionComponent = () => {
  const { account } = useStoreApp()

  const [sheetVisible, setSheetVisible] = useState(false)

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <Box className="relative z-[1]">
        <BannerSlider />
        <SearchSection />
        <ServiceSection setSheetVisible={setSheetVisible} />
        <Divider size={8} />
        <DestinationSection />
        <Divider size={8} />
        <DestinationTravelSection />
        <Divider size={8} />
        <CusineSection />
        <Divider size={8} />
        <NewsSection />
        <Divider size={8} />
        <EventsSection />
        <Divider size={8} />
        <TourSection />
        <Divider size={8} />
        <AccommodationSection
          data={HOTEL_DATA}
          title="Khách sạn"
          type="hotel"
        />
        <Divider size={8} />
        <AccommodationSection
          data={RESTAURENT_DATA}
          title="Nhà hàng"
          type="restaurent"
        />
        {/* <Divider size={8} />
        <LongAnMap /> */}
      </Box>
      <ServiceSub
        sheetVisible={sheetVisible}
        setSheetVisible={setSheetVisible}
      />
    </Page>
  )
}

export default HomePage
