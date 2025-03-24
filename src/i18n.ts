import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { enAccount, enCommon, enHome, enPage, enSetting, enSnackbar } from "locales/en";
import { viAccount, viCommon, viHome, viPage, viSetting, viSnackbar } from "locales/vi";

export const initI18n = async (language: string) => {
    await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    common: enCommon,
                    home: enHome,
                    setting: enSetting,
                    account: enAccount,
                    page: enPage,
                    snackbar: enSnackbar
                },
                vi: {
                    common: viCommon,
                    home: viHome,
                    setting: viSetting,
                    account: viAccount,
                    page: viPage,
                    snackbar: viSnackbar
                },
            },
            lng: language,
            fallbackLng: "vi",
            ns: ["common", "home", "setting", "account", "page", "snackbar"],
            defaultNS: "home",
            interpolation: { escapeValue: false },
        });
};

export default i18n;
