import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getDataFromStorage } from "services/zalo";
import { enAccount, enCommon, enHome, enSetting } from "locales/en";
import { viAccount, viCommon, viHome, viSetting } from "locales/vi";

const initI18n = async () => {
    const storedData = await getDataFromStorage(["lng"]);
    const language = storedData?.lng || "vi";

    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    common: enCommon,
                    home: enHome,
                    setting: enSetting,
                    account: enAccount
                },
                vi: {
                    common: viCommon,
                    home: viHome,
                    setting: viSetting,
                    account: viAccount
                },
            },
            lng: language,
            fallbackLng: "vi",
            ns: ["common", "home", "setting", "account"],
            defaultNS: "home",
            interpolation: { escapeValue: false },
        });
};

initI18n();
export default i18n;
