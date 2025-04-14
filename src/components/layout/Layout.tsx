import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUserInfo } from 'apiRequest/auth';
import { useGetLanguages } from 'apiRequest/languages';
import { LoadingFullScreen } from 'components/loading';
import LoginModal from 'components/LoginModal/LoginModal';
import { NavigationBottom } from 'components/navigation-bottom';
import ScrollToTop from 'components/scroll-top';
import ForbiddenPage from 'pages/403';
import { AccommodationDetailPage, AccommodationPage } from 'pages/accommodation';
import { AccountPage, ChangePasswordPage, LoginPage, ProfileAccountPage } from 'pages/account';
import LanguagePage from 'pages/account/language';
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
import { PostDetailPage } from 'pages/postDetailPage';
import { PostListPage } from 'pages/postListPage';
import { ProfileResidentPage } from 'pages/profile';
import { SearchPage, SettingsPage } from 'pages/settings';
import { ShoppingDetailPage, ShoppingPage } from 'pages/shopping';
import { TaxiDetailPage, TaxiPage } from 'pages/taxi';
import { TourDetailPage, TourPage } from 'pages/tour';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getDataFromStorage, setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';

const Layout = () => {
  const { isLoadingFullScreen, setLanguages, setCurrentLanguage } = useStoreApp();

  const { data: languageData } = useGetLanguages();
  const { setAccount, setToken } = useStoreApp();
  const { mutateAsync: getUserInfo } = useGetUserInfo();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await getDataFromStorage('token');
        if (token) {
          setToken(token);
          const res = await getUserInfo();
          if (res) {
            setAccount(res);
          }
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin tài khoản:', error);
      }
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    if (languageData) {
      const initLanguage = async () => {
        setLanguages(languageData);
        const currentKey = (await getDataFromStorage('langId')) || 1;
        const currentLang = languageData.find(item => Number(item.langId) === Number(currentKey));
        if (currentLang) {
          setCurrentLanguage(currentLang.langId, currentLang.value as string);
        }
      };
      initLanguage();
    }
  }, [languageData]);
  return (
    <>
      <ScrollToTop />
      <LoadingFullScreen isLoading={isLoadingFullScreen} />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>

        {/* NEWS */}
        <Route path="/chuyen-muc/:id" element={<PostListPage />}></Route>
        <Route path="/bai-viet/:id" element={<PostDetailPage />}></Route>

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
      <LoginModal />
      <NavigationBottom />
    </>
  );
};

export default Layout;
