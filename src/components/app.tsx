import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ForbiddenPage from 'pages/403';
import { AccommodationDetailPage, AccommodationPage } from 'pages/accommodation';
import { AccountPage, ChangePasswordPage, LoginPage, ProfileAccountPage } from 'pages/account';
import RegisterPage from 'pages/account/register';
import { AtmDetailPage, AtmPage } from 'pages/atm';
import { BusDetailPage, BusPage } from 'pages/bus';
import { BusRoutingDetailPage, BusRoutingPage } from 'pages/bus-routing';
import { CusineDetailPage, CusinePage } from 'pages/cusine';
import { FavoritePage } from 'pages/favorite';
import { FeedbackAddPage, FeedbackDetailPage, FeedbackHistoryPage, FeedbackPage } from 'pages/feedback';
import { GalleryDetailPage, GalleryPage } from 'pages/gallery';
import { GuideDetailPage, GuidePage } from 'pages/guide-tour';
import { HomePage } from 'pages/homepage';
import { HospitalDetailPage, HospitalPage } from 'pages/hospital';
import { LocationDetailPage, LocationPage } from 'pages/location';
import { ResidentMapPage } from 'pages/maps';
import { MarketDetailPage, MarketPage } from 'pages/market';
import { NewsDetailPage, NewsPage } from 'pages/news';
import { NotificationPage } from 'pages/notification';
import { OilDetailPage, OilPage } from 'pages/oil';
import { ProfileResidentPage } from 'pages/profile';
import { LanguagePage, SearchPage, SettingsPage } from 'pages/settings';
import { ShoppingDetailPage, ShoppingPage } from 'pages/shopping';
import { TaxiDetailPage, TaxiPage } from 'pages/taxi';
import { TourDetailPage, TourPage } from 'pages/tour';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ProtectedRoute } from 'services/permission';
import { getDataFromStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { App, SnackbarProvider, ZMPRouter } from 'zmp-ui';

import { initI18n } from '../i18n';
import { LoadingFullScreen } from './loading';
import { NavigationBottom } from './navigation-bottom';
import ScrollToTop from './scroll-top';

const MyApp = () => {
  const queryClient = new QueryClient();
  const { isLoadingFullScreen, setAuth } = useStoreApp();
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  // const loadAuthData = async () => {
  //   try {
  //     const storedData = await getDataFromStorage(["account", "token"]);

  //     console.log(storedData)

  //     if (!storedData) {
  //       setAuth({ account: null, token: null });
  //       return;
  //     }

  //     const storedAccount = storedData.account ? JSON.parse(storedData.account) : null;
  //     const storedToken = storedData.token || null;

  //     setAuth({
  //       account: storedAccount,
  //       token: storedToken,
  //     });
  //   } catch (error) {
  //     console.error("Lỗi khi load dữ liệu từ storage:", error);
  //     setAuth({ account: null, token: null }); // Reset nếu có lỗi
  //   }
  // };

  // useEffect(() => {
  //   loadAuthData();
  // }, [setAuth]);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedData = (await getDataFromStorage(['account', 'token', 'lng'])) || {}; // Đảm bảo storedData luôn là object
        const language = storedData.lng ?? 'vi'; // Dùng nullish coalescing (??) để tránh lỗi undefined

        await initI18n(language);
        setIsI18nInitialized(true);

        const storedAccount = storedData.account ? JSON.parse(storedData.account) : null;
        const storedToken = storedData.token ?? null;

        setAuth({
          account: storedAccount,
          token: storedToken,
        });
      } catch (error) {
        console.error('Lỗi khi load dữ liệu từ storage:', error);
        setAuth({ account: null, token: null });
      }
    };

    loadAuthData();
  }, [setAuth]);

  if (!isI18nInitialized) {
    return <LoadingFullScreen isLoading={true} />;
  }

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
                <Route path="/news/:id" element={<NewsDetailPage></NewsDetailPage>}></Route>

                {/* CUSINE */}
                <Route path="/cusine" element={<CusinePage></CusinePage>}></Route>
                <Route path="/cusine-detail" element={<CusineDetailPage></CusineDetailPage>}></Route>

                {/* TOUR */}
                <Route path="/tour" element={<TourPage></TourPage>}></Route>
                <Route path="/tour/:id" element={<TourDetailPage></TourDetailPage>}></Route>

                {/* Lưu trú */}
                <Route path="/accommodation" element={<AccommodationPage></AccommodationPage>}></Route>
                <Route path="/accommodation/:id" element={<AccommodationDetailPage></AccommodationDetailPage>}></Route>

                {/* Địa điểm */}
                <Route path="/location" element={<LocationPage />}></Route>
                <Route path="/location/:id" element={<LocationDetailPage />}></Route>
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

                {/* Gallery */}
                <Route path="/gallery" element={<GalleryPage></GalleryPage>}></Route>
                <Route path="/gallery-detail" element={<GalleryDetailPage></GalleryDetailPage>}></Route>

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
                <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

                {/* NOTIFICATION */}
                <Route path="/notification" element={<NotificationPage></NotificationPage>}></Route>

                {/* MAP */}
                <Route path="/maps" element={<ResidentMapPage></ResidentMapPage>}></Route>

                {/* PROFILE */}
                <Route path="/profile-resident" element={<ProfileResidentPage></ProfileResidentPage>}></Route>

                {/* PERMISSION */}
                <Route path="/403" element={<ForbiddenPage></ForbiddenPage>}></Route>

                {/* SETTINGS */}
                <Route path="/settings" element={<SettingsPage></SettingsPage>}></Route>
                <Route path="/languages" element={<LanguagePage></LanguagePage>}></Route>
                <Route path="/search" element={<SearchPage></SearchPage>}></Route>
              </Routes>
              <NavigationBottom />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default MyApp;
