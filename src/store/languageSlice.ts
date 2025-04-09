import { LanguageType } from 'apiRequest/languages/types';
import { setDataToStorage } from 'services/zalo';

export type LanguageSliceType = {
  languages: LanguageType[];
  currentLanguage: {
    langId: number;
    value: Record<string, string>; // value parse từ string JSON
  };
  setLanguages: (langs: LanguageType[]) => void;
  setCurrentLanguage: (langId: number, value: string) => void;
  changeAppLanguage: (langId: number) => void;
};

export const createLanguageSlice = (set: any, get: any): LanguageSliceType => ({
  languages: [],
  currentLanguage: {
    langId: 1,
    value: {},
  },
  // Lưu tất cả ngôn ngữ
  setLanguages: langs => set({ languages: langs }),

  // Gán ngôn ngữ hiện tại
  setCurrentLanguage: (langId, value) =>
    set({
      currentLanguage: {
        langId,
        value: JSON.parse(value),
      },
    }),

  // Thay đổi ngôn ngữ
  changeAppLanguage: langId => {
    const lang = get().languages.find(item => Number(item.langId) === Number(langId));
    if (lang) {
      set({
        currentLanguage: {
          langId: lang.langId,
          value: JSON.parse(lang.value as string),
        },
      });
      setDataToStorage('langId', String(langId));
    }
  },
});
