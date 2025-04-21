import LoginBanner from 'assets/images/login_banner.webp';
import { LoginForm } from 'components/account';
import { HeaderSub } from 'components/HeaderSub';
import React from 'react';
import { useStoreApp } from 'store/store';
import { Box, Page } from 'zmp-ui';

const LoginPage: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  return (
    <Page className="relative flex-1 flex flex-col bg-white login-page">
      <Box>
        <HeaderSub title={t['Login']} />
        <Box>
          <img
            className="h-[260px] w-full object-cover"
            style={{
              clipPath: 'ellipse(120% 100% at 30% 0%)',
            }}
            src={LoginBanner}
            alt="Đăng nhập"
          />
        </Box>
        <Box p={4} mt={6}>
          <Box>
            <h3 className="text-[24px] font-bold text-[#355933] text-center">{t['WelcomeBack']}</h3>
            <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">{t['LoginDesc']}</h4>
          </Box>
          <Box py={4}>
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default LoginPage;
