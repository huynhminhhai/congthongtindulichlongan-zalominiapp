import RegisterBanner from 'assets/images/register_banner.jpg';
import { RegisterForm } from 'components/account';
import { HeaderSub } from 'components/HeaderSub';
import React from 'react';
import { useStoreApp } from 'store/store';
import { Box, Page } from 'zmp-ui';

const RegisterPage: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  return (
    <Page className="relative flex-1 flex flex-col bg-white login-page">
      <Box>
        <HeaderSub title={t['Register']} />
        <Box>
          <img
            className="h-[260px] w-full object-cover"
            style={{
              clipPath: 'ellipse(120% 100% at 60% 0%)',
            }}
            src={RegisterBanner}
            alt="Đăng ký"
          />
        </Box>
        <Box p={4} mt={4}>
          <Box>
            <h3 className="text-[24px] font-bold text-[#355933] text-center">{t['WelcomeBack']}</h3>
            <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">{t['RegisterDesc']}</h4>
          </Box>
          <Box py={4}>
            <RegisterForm />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default RegisterPage;
