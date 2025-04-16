import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';

const accountApiRequest = {
  update: async (data: any) => {
    return await http.post<any>('/Account/update-profile', data);
  },
};

export const useUpdateAccount = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const queryClient = useQueryClient();
  const { setAuth, account, token } = useStoreApp();
  const { showSuccess, showError } = useCustomSnackbar();

  return useMutation({
    mutationFn: accountApiRequest.update,
    onSuccess: data => {
      showSuccess(t['AccountInfoUpdatedSuccess']);

      if (data && data?.data) {
        const newData = { ...account, ...data.data };

        queryClient.setQueryData(['account'], newData);

        if (newData) {
          setAuth({ account: newData, token });
        }
      }
    },
    onError: (error: any) => {
      console.error('Lỗi:', error?.message);
      showError(error?.message);
    },
  });
};

export const useUpdatePassword = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { showSuccess, showError } = useCustomSnackbar();

  return useMutation({
    mutationFn: accountApiRequest.update,
    onSuccess: data => {
      showSuccess(t['ChangePasswordSuccess']);
    },
    onError: (error: any) => {
      console.error('Lỗi:', error?.message);
      showError(error?.message);
    },
  });
};
