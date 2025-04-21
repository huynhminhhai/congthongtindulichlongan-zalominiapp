import { useGetUserInfo } from 'apiRequest/auth';
import { useGetLanguages } from 'apiRequest/languages';
import { LoadingFullScreen } from 'components/LoadingFullScreen';
import LoginModal from 'components/LoginModal/LoginModal';
import { NavigationBottom } from 'components/NavigationBottom';
import ScrollToTop from 'components/scroll-top';
import ForbiddenPage from 'pages/403';
import { AccountPage, ProfileAccountPage } from 'pages/account';
import { ChangePasswordPage } from 'pages/ChangePassword';
import { Favorite } from 'pages/Favorite';
import { FeedbackAddPage } from 'pages/Feedback';
import { GalleryDetailPage, GalleryPage } from 'pages/gallery';
import { Homepage } from 'pages/Homepage';
import LanguagePage from 'pages/Languages/Languages';
import { LoginPage } from 'pages/Login';
import { ResidentMapPage } from 'pages/Maps';
import { PostDetailPage } from 'pages/PostDetail';
import { PostListPage } from 'pages/PostList';
import { RegisterPage } from 'pages/Register';
import { SearchPage } from 'pages/Search';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getDataFromStorage } from 'services/zalo';
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
        <Route path="/" element={<Homepage />}></Route>

        {/* NEWS */}
        <Route path="/chuyen-muc/:id" element={<PostListPage />}></Route>
        <Route path="/bai-viet/:id" element={<PostDetailPage />}></Route>

        {/* FAVORITE */}
        <Route path="/favorite" element={<Favorite></Favorite>}></Route>

        {/* Gallery */}
        <Route path="/gallery" element={<GalleryPage></GalleryPage>}></Route>
        <Route path="/gallery-detail" element={<GalleryDetailPage></GalleryDetailPage>}></Route>

        {/* FEEDBACK */}
        <Route path="/feedback" element={<FeedbackAddPage></FeedbackAddPage>}></Route>

        {/* ACCOUNT */}
        <Route path="/account" element={<AccountPage></AccountPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/profile-account" element={<ProfileAccountPage></ProfileAccountPage>}></Route>
        <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

        {/* MAP */}
        <Route path="/maps" element={<ResidentMapPage></ResidentMapPage>}></Route>

        {/* PERMISSION */}
        <Route path="/403" element={<ForbiddenPage></ForbiddenPage>}></Route>

        <Route path="/languages" element={<LanguagePage></LanguagePage>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
      </Routes>
      <LoginModal />
      <NavigationBottom />
    </>
  );
};

export default Layout;
