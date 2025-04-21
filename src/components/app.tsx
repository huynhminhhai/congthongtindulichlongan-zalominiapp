import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { getDataFromStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { App, SnackbarProvider, ZMPRouter } from 'zmp-ui';

import { initI18n } from '../i18n';
import { Layout } from './Layout';
import { LoadingFullScreen } from './loading';

const MyApp = () => {
  const queryClient = new QueryClient();
  const { setAuth } = useStoreApp();
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const accountRaw = await getDataFromStorage('account');
        const token = await getDataFromStorage('token');
        const lng = await getDataFromStorage('lng');

        const language = lng ?? 'vi';
        await initI18n(language);
        setIsI18nInitialized(true);

        const storedAccount = accountRaw ? JSON.parse(accountRaw) : null;

        setAuth({
          account: storedAccount,
          token: token ?? null,
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
              <Layout />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default MyApp;
