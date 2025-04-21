import { HeaderSub } from 'components/HeaderSub';
import React from 'react';
import { useStoreApp } from 'store/store';
import { Box, Page } from 'zmp-ui';

import FeedbackAddForm from './FeedbackAddForm';

const FeedbackAddPage: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
      <Box>
        <HeaderSub title={t['SendFeedbackTitle']} />
        <FeedbackAddForm />
      </Box>
    </Page>
  );
};

export default FeedbackAddPage;
