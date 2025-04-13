import { UserInfoType } from 'apiRequest/auth/type';
import { removeDataFromStorage, setDataToStorage } from 'services/zalo';

import { useStoreApp } from './store';

export interface AuthSliceType {
  account: UserInfoType | null;
  token: string | null;
  setAccount: (account: UserInfoType | null) => void;
  setAuth: (authData: { account: UserInfoType | null; token: string | null }) => void;
  clearAuth: () => void;
}

export const createAuthSlice = (set: any): AuthSliceType => ({
  account: null,
  token: null,
  setAccount: account => {
    set((state: AuthSliceType) => ({
      ...state,
      account,
    }));

    if (account) {
      setDataToStorage('account', JSON.stringify(account));
    } else {
      removeDataFromStorage('account');
    }
  },
  setAuth: ({ account, token }) => {
    set((state: AuthSliceType) => ({
      ...state,
      account,
      token,
    }));

    if (account && token) {
      setDataToStorage('account', JSON.stringify(account));
      setDataToStorage('token', token);
    } else {
      removeDataFromStorage('account');
      removeDataFromStorage('token');
    }
  },

  clearAuth: () => {
    set((state: AuthSliceType) => ({
      ...state,
      account: null,
      token: null,
    }));

    removeDataFromStorage('account');
    removeDataFromStorage('token');
  },
});
