import { LanguageType } from 'apiRequest/languages/types';

export type LanguageSliceType = {
  languages: LanguageType[];
  currentLanguage: {
    key: string;
    value: Record<string, string>; // value parse từ string JSON
  };
  setLanguages: (langs: LanguageType[]) => void;
  setCurrentLanguage: (key: string, value: string) => void;
  changeAppLanguage: (key: string) => void;
};

export const createLanguageSlice = (set: any, get: any): LanguageSliceType => ({
  languages: [],
  currentLanguage: {
    key: 'vi',
    value: {},
  },
  // Lưu tất cả ngôn ngữ
  setLanguages: langs => set({ languages: langs }),

  // Gán ngôn ngữ hiện tại
  setCurrentLanguage: (key, value) =>
    set({
      currentLanguage: {
        key,
        value: JSON.parse(value),
      },
    }),

  // Thay đổi ngôn ngữ
  changeAppLanguage: key => {
    const lang = get().languages.find(item => item.keyName === key);
    if (lang) {
      set({
        currentLanguage: {
          key: lang.keyName,
          value: JSON.parse(lang.value as string),
        },
      });
      localStorage.setItem('lng', key);
    }
  },
});
