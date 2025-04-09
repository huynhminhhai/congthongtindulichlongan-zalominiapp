import { HeaderSub } from 'components/header-sub';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils/formatImageSrc';
import { Box, Page, useSnackbar } from 'zmp-ui';

const LanguagePage: React.FC = () => {
  const { setIsLoadingFullScreen, languages, currentLanguage, changeAppLanguage } = useStoreApp();
  const { t, i18n } = useTranslation('setting');

  const handleChangeLanguage = async (langId: number) => {
    setIsLoadingFullScreen(true);
    changeAppLanguage(langId);
    setIsLoadingFullScreen(false);
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
      <Box>
        <HeaderSub title={t('languages')} />
        <Box p={4}>
          <div className="flex flex-col gap-2">
            {languages.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`bg-[#fff] flex gap-3 p-3 items-center border-[1px] rounded-lg ${
                    currentLanguage.langId === item.langId ? 'border-[#355955]' : 'border-gray-300'
                  }`}
                  onClick={() => handleChangeLanguage(item.langId)}
                >
                  <img src={formatImageSrc(item.image)} className="w-[50px] h-[50px]" />
                  <div className="text-[16px] font-semibold ">{item.name}</div>
                </div>
              );
            })}
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default LanguagePage;
