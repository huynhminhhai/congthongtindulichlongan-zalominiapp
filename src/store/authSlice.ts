import { removeDataFromStorage, setDataToStorage } from 'services/zalo';

import { useStoreApp } from './store';

export interface Account {
  id: string;
  fullname: string;
  avatar: string;
  role: string;
  phoneNumber: string;
}

export interface AuthSliceType {
  account: Account | null;
  token: string | null;
  setAuth: (authData: { account: Account | null; token: string | null }) => void;
  clearAuth: () => void;
}

export const createAuthSlice = (set: any): AuthSliceType => ({
  account: null,
  token: null,
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

export const useRole = () => {
  return useStoreApp(state => state.account?.role || 'guest');
};
