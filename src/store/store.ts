import { create } from 'zustand';

import { AppSliceType, createAppSlice } from './appSlice';
import { AuthSliceType, createAuthSlice } from './authSlice';
import { createLanguageSlice, LanguageSliceType } from './languageSlice';

type StoreState = AppSliceType & AuthSliceType & LanguageSliceType;

export const useStoreApp = create<StoreState>()((set, get) => ({
  ...createAppSlice(set),
  ...createAuthSlice(set),
  ...createLanguageSlice(set, get),
}));
