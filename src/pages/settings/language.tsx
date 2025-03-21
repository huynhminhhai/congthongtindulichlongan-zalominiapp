import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useTranslation } from "react-i18next";
import { setDataToStorage } from "services/zalo";
import { useStoreApp } from "store/store";
import { Avatar, Box, Page, useSnackbar } from "zmp-ui"

const LanguagePage: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const { setIsLoadingFullScreen } = useStoreApp();
    const { t, i18n } = useTranslation("setting");
    const { t: tSnackbar } = useTranslation("snackbar");

    const handleChangeLanguage = async (lng: string) => {
        if (lng === i18n.language) return;
        setIsLoadingFullScreen(true);

        await setDataToStorage({ lng });
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
                <HeaderSub title={t("languages")} />
                <Box p={4}>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                        <Box
                            p={4}
                            flex
                            flexDirection="column"
                            alignItems="center"
                            className={`bg-[#fff] border-[2px] rounded-lg ${i18n.language === "vi" ? "border-[#355955]" : "border-gray-300"
                                }`}
                            onClick={() => handleChangeLanguage("vi")}
                        >
                            <Avatar src={images.vietnam} />
                            <div className="text-[16px] font-semibold mt-1">Vietnamese</div>
                        </Box>
                        <Box
                            p={4}
                            flex
                            flexDirection="column"
                            alignItems="center"
                            className={`bg-[#fff] border-[2px] rounded-lg ${i18n.language === "en" ? "border-[#355955]" : "border-gray-300"
                                }`}
                            onClick={() => handleChangeLanguage("en")}
                        >
                            <Avatar src={images.english} />
                            <div className="text-[16px] font-semibold mt-1">English</div>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default LanguagePage