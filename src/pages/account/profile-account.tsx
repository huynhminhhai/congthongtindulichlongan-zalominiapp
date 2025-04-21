import { ProfileForm } from 'components/account';
import { HeaderSub } from 'components/HeaderSub';
import React from 'react';
import { useStoreApp } from 'store/store';
import { Box, Page } from 'zmp-ui';

const ProfileAccountPage: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
      <Box>
        <HeaderSub title={t['Login']} />
        <Box>
          <ProfileForm />
        </Box>
      </Box>
    </Page>
  );
};

export default ProfileAccountPage;
