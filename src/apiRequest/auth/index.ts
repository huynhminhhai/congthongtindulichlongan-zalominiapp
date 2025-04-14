import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { removeDataFromStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';

import { AuthResponseType } from './type';

type LoginZaloParamsType = {
  access_token: string;
  providerKey: string;
  code: string;
  userName: string;
  avatar: string;
};
type LoginAccountParamsType = {
  username: string;
  password: string;
};
const authApiRequest = {
  loginZalo: async (params: LoginZaloParamsType) => {
    const response = await http.post<{ token: string }>('/Account/signin-zalo', {
      access_token: params.access_token,
      providerKey: params.providerKey,
      code: params.code,
      userName: params.userName,
      avatar: params.avatar,
    });
    return response;
  },
  loginAccount: async (params: LoginAccountParamsType) => {
    const response = await http.post<{ token: string }>('/Account/Login', {
      username: params.username,
      password: params.password,
    });
    return response;
  },
  logout: () => {
    removeDataFromStorage('token');
  },
  getUserInfo: async () => {
    return await http.get<any>(`/Account/UserInfo`);
  },
};

export const useLoginZalo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: LoginZaloParamsType) => {
      return await authApiRequest.loginZalo(params);
    },
    onSuccess: (data: AuthResponseType) => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error: string) => {
      throw new Error(error);
    },
  });
};
export const useLoginAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: LoginAccountParamsType) => {
      return authApiRequest.loginAccount(params);
    },
    onSuccess: (data: AuthResponseType) => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error: string) => {
      throw new Error(error);
    },
  });
};
export const useLogout = () => {
  const { clearAuth } = useStoreApp();
  const { showSuccess } = useCustomSnackbar();
  const { setAuth, currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  const logout = () => {
    authApiRequest.logout();
    clearAuth();
    showSuccess(t['LogoutSuccess']);
  };

  return logout;
};
export const useGetUserInfo = () => {
  return useMutation({
    mutationFn: async () => {
      return await authApiRequest.getUserInfo();
    },
  });
};
