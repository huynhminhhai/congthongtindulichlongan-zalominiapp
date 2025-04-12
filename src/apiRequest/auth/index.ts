import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import http from 'services/http';
import { removeDataFromStorage, setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useNavigate, useSnackbar } from 'zmp-ui';

type LoginParamsType = {
  access_token: string;
  providerKey: string;
  code: string;
  userName: string;
  avatar: string;
};
const authApiRequest = {
  loginZalo: async (params: LoginParamsType) => {
    const response = await http.post<{ token: string }>('/Account/signin-zalo', {
      access_token: params.access_token,
      providerKey: params.providerKey,
      code: params.code,
      userName: params.userName,
      avatar: params.avatar,
    });
    console.log(response);
    // if (response.token) {
    //     localStorage.setItem('token', response.token);
    // }

    // return response;
  },

  logout: () => {
    removeDataFromStorage('token');
    removeDataFromStorage('account');
  },
};
export const useLogin = () => {
  const queryClient = useQueryClient();

  const { openSnackbar } = useSnackbar();
  const { setAuth } = useStoreApp();
  const { t: tSnackbar } = useTranslation('snackbar');

  return useMutation({
    mutationFn: async (params: LoginParamsType) => {
      return authApiRequest.loginZalo(params);
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
      openSnackbar({
        icon: true,
        text: error,
        type: 'error',
        action: { text: tSnackbar('close'), close: true },
        duration: 3000,
      });
    },
  });
};
export const useLoginZalo = () => {
  const queryClient = useQueryClient();

  const { openSnackbar } = useSnackbar();
  const { setAuth } = useStoreApp();
  const { t: tSnackbar } = useTranslation('snackbar');

  return useMutation({
    mutationFn: async (params: LoginParamsType) => {
      return authApiRequest.loginZalo(params);
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
      // openSnackbar({
      //   icon: true,
      //   text: error,
      //   type: 'error',
      //   action: { text: tSnackbar('close'), close: true },
      //   duration: 3000,
      // });
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
