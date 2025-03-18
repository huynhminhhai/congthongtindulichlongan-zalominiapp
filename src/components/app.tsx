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
