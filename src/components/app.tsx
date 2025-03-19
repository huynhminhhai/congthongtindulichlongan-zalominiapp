import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Navigation } from "./navigation";
import ScrollToTop from "./scroll-top";
import { NewsDetailPage, NewsPage } from "pages/news";
import { HomePage } from "pages/homepage";
import { FeedbackAddPage, FeedbackDetailPage, FeedbackHistoryPage, FeedbackPage } from "pages/feedback";
import { ProfileResidentPage } from "pages/profile";
import { AccountPage, ChangePasswordPage, LoginPage, ProfileAccountPage } from "pages/account";
import { LoadingFullScreen } from "./loading";
import { useStoreApp } from "store/store";
import { NotificationPage } from "pages/notification";
import { ResidentMapPage } from "pages/maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDataFromStorage } from "services/zalo";
import { ProtectedRoute } from "services/permission";
import ForbiddenPage from "pages/403";
import { EventsDetailPage, EventsPage } from "pages/events";
import { DestinationDetailPage, DestinationPage } from "pages/destination";
import { DestinationTravelDetailPage, DestinationTravelPage } from "pages/destination-travel";
import { CusineDetailPage, CusinePage } from "pages/cusine";
import { TourDetailPage, TourPage } from "pages/tour";
import { HotelDetailPage, HotelPage } from "pages/hotel";
import { RestaurantDetailPage, RestaurantPage } from "pages/restaurant";
import { GuideDetailPage, GuidePage } from "pages/guide-tour";
import { FavoritePage } from "pages/favorite";
import { ShoppingDetailPage, ShoppingPage } from "pages/shopping";
import { MarketDetailPage, MarketPage } from "pages/market";
import { BusDetailPage, BusPage } from "pages/bus";
import { TaxiDetailPage, TaxiPage } from "pages/taxi";
import { OilDetailPage, OilPage } from "pages/oil";
import { HospitalDetailPage, HospitalPage } from "pages/hospital";
import { AtmDetailPage, AtmPage } from "pages/atm";
import { BusRoutingDetailPage, BusRoutingPage } from "pages/bus-routing";

const MyApp = () => {

  const { isLoadingFullScreen, setAuth } = useStoreApp();

  const queryClient = new QueryClient()

  const loadAuthData = async () => {
    try {
      const storedData = await getDataFromStorage(["account", "token"]);

      if (!storedData) {
        setAuth({ account: null, token: null });
        return;
      }

      const storedAccount = storedData.account ? JSON.parse(storedData.account) : null;
      const storedToken = storedData.token || null;

      setAuth({
        account: storedAccount,
        token: storedToken,
      });
    } catch (error) {
      console.error("Lỗi khi load dữ liệu từ storage:", error);
      setAuth({ account: null, token: null }); // Reset nếu có lỗi
    }
  };

  useEffect(() => {
    loadAuthData();
  }, [setAuth]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <ScrollToTop />
              <LoadingFullScreen isLoading={isLoadingFullScreen} />
              <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>

                {/* NEWS */}
                <Route path="/news" element={<NewsPage></NewsPage>}></Route>
                <Route path="/news-detail" element={<NewsDetailPage></NewsDetailPage>}></Route>

                {/* EVENTS */}
                <Route path="/events" element={<EventsPage></EventsPage>}></Route>
                <Route path="/events-detail" element={<EventsDetailPage></EventsDetailPage>}></Route>

                {/* DESTINATION */}
                <Route path="/destination" element={<DestinationPage></DestinationPage>}></Route>
                <Route path="/destination-detail" element={<DestinationDetailPage></DestinationDetailPage>}></Route>

                {/* DESTINATION TRAVEL */}
                <Route path="/destination-travel" element={<DestinationTravelPage></DestinationTravelPage>}></Route>
                <Route path="/destination-travel-detail" element={<DestinationTravelDetailPage></DestinationTravelDetailPage>}></Route>

                {/* CUSINE */}
                <Route path="/cusine" element={<CusinePage></CusinePage>}></Route>
                <Route path="/cusine-detail" element={<CusineDetailPage></CusineDetailPage>}></Route>

                {/* TOUR */}
                <Route path="/tour" element={<TourPage></TourPage>}></Route>
                <Route path="/tour-detail" element={<TourDetailPage></TourDetailPage>}></Route>

                {/* HOTEL */}
                <Route path="/hotel" element={<HotelPage></HotelPage>}></Route>
                <Route path="/hotel-detail" element={<HotelDetailPage></HotelDetailPage>}></Route>

                {/* RESTAURANT */}
                <Route path="/restaurant" element={<RestaurantPage></RestaurantPage>}></Route>
                <Route path="/restaurant-detail" element={<RestaurantDetailPage></RestaurantDetailPage>}></Route>

                {/* GUIDE TOUR */}
                <Route path="/guide" element={<GuidePage></GuidePage>}></Route>
                <Route path="/guide-detail" element={<GuideDetailPage></GuideDetailPage>}></Route>

                {/* FAVORITE */}
                <Route path="/favorite" element={<FavoritePage></FavoritePage>}></Route>

                {/* SHOPPING */}
                <Route path="/shopping" element={<ShoppingPage></ShoppingPage>}></Route>
                <Route path="/shopping-detail" element={<ShoppingDetailPage></ShoppingDetailPage>}></Route>

                {/* MARKET */}
                <Route path="/market" element={<MarketPage></MarketPage>}></Route>
                <Route path="/market-detail" element={<MarketDetailPage></MarketDetailPage>}></Route>

                {/* BUS */}
                <Route path="/bus" element={<BusPage></BusPage>}></Route>
                <Route path="/bus-detail" element={<BusDetailPage></BusDetailPage>}></Route>

                {/* Taxi */}
                <Route path="/taxi" element={<TaxiPage></TaxiPage>}></Route>
                <Route path="/taxi-detail" element={<TaxiDetailPage></TaxiDetailPage>}></Route>

                {/* Oil */}
                <Route path="/oil" element={<OilPage></OilPage>}></Route>
                <Route path="/oil-detail" element={<OilDetailPage></OilDetailPage>}></Route>

                {/* Hospital */}
                <Route path="/hospital" element={<HospitalPage></HospitalPage>}></Route>
                <Route path="/hospital-detail" element={<HospitalDetailPage></HospitalDetailPage>}></Route>

                {/* ATM */}
                <Route path="/atm" element={<AtmPage></AtmPage>}></Route>
                <Route path="/atm-detail" element={<AtmDetailPage></AtmDetailPage>}></Route>

                {/* Bus routing */}
                <Route path="/bus-routing" element={<BusRoutingPage></BusRoutingPage>}></Route>
                <Route path="/bus-routing-detail" element={<BusRoutingDetailPage></BusRoutingDetailPage>}></Route>

                {/* FEEDBACK */}
                <Route path="/feedback" element={<FeedbackPage></FeedbackPage>}></Route>
                <Route path="/feedback-detail" element={<FeedbackDetailPage></FeedbackDetailPage>}></Route>
                <Route path="/feedback-add" element={<FeedbackAddPage></FeedbackAddPage>}></Route>
                <Route path="/feedback-history" element={<FeedbackHistoryPage></FeedbackHistoryPage>}></Route>

                {/* ACCOUNT */}
                <Route path="/account" element={<AccountPage></AccountPage>}></Route>
                <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                <Route path="/profile-account" element={<ProfileAccountPage></ProfileAccountPage>}></Route>
                <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>

                {/* NOTIFICATION */}
                <Route path="/notification" element={<NotificationPage></NotificationPage>}></Route>

                {/* MAP */}
                <Route path="/maps" element={<ResidentMapPage></ResidentMapPage>}></Route>

                {/* PROFILE */}
                <Route path="/profile-resident" element={<ProfileResidentPage></ProfileResidentPage>}></Route>

                {/* PERMISSION */}
                <Route path="/403" element={<ForbiddenPage></ForbiddenPage>}></Route>

              </Routes>
              <Navigation />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default MyApp;
