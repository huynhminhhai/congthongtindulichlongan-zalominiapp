import images from 'assets/images';
import { HeaderSub } from 'components/header-sub';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils/formatImageSrc';
import { Avatar, Box, Page, useSnackbar } from 'zmp-ui';

const LanguagePage: React.FC = () => {
  const { languages, setCurrentLanguage } = useStoreApp();
  const { openSnackbar } = useSnackbar();
  const { setIsLoadingFullScreen } = useStoreApp();
  const { t, i18n } = useTranslation('setting');
  const { t: tSnackbar } = useTranslation('snackbar');

  const handleChangeLanguage = async (lng: string) => {
    if (lng === i18n.language) return;
    setIsLoadingFullScreen(true);

    const currentLang = languages.find(item => item.keyName === lng);
    if (currentLang) {
      setCurrentLanguage(currentLang.keyName, currentLang.value as string);
    }
    await setDataToStorage('lng', lng);
    i18n.changeLanguage(lng);

    setIsLoadingFullScreen(false);
    openSnackbar({
      icon: true,
      text: `${tSnackbar('language-switched')} ${lng}`,
      type: 'success',
      action: { text: tSnackbar('close'), close: true },
      duration: 3000,
    });
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
                    i18n.language === item.keyName ? 'border-[#355955]' : 'border-gray-300'
                  }`}
                  onClick={() => handleChangeLanguage(item.keyName)}
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
