import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import http from 'services/http';
import { removeDataFromStorage, setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useNavigate, useSnackbar } from 'zmp-ui';

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
    removeDataFromStorage('account');
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

  const { openSnackbar } = useSnackbar();
  const { setAuth } = useStoreApp();
  const { t: tSnackbar } = useTranslation('snackbar');

  return useMutation({
    mutationFn: async (params: LoginAccountParamsType) => {
      return authApiRequest.loginAccount(params);
    },
    onSuccess: (data: any) => {
      openSnackbar({
        icon: true,
        text: tSnackbar('login-success'),
        type: 'success',
        action: { text: tSnackbar('close'), close: true },
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['account'] });

      setAuth({
        account: data.account || null,
        token: data.token || null,
      });
    },
    onError: (error: string) => {
      console.error('Lỗi:', error);
      throw new Error(error);
    },
  });
};
export const useLogout = () => {
  const { openSnackbar } = useSnackbar();
  const { clearAuth } = useStoreApp();
  const { t: tSnackbar } = useTranslation('snackbar');

  const logout = () => {
    authApiRequest.logout();

    clearAuth();

    openSnackbar({
      icon: true,
      text: tSnackbar('logout-success'),
      type: 'success',
      action: { text: tSnackbar('close'), close: true },
      duration: 3000,
    });
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
