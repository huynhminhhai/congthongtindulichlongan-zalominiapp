export type LanguageResponseType = LanguageType[];
export type LanguageType = {
  id: number;
  langId: number;
  keyName: string;
  name?: string;
  image: string;
  value: string;
};
