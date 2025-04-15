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
  const queryClient = useQueryClient();
  const { setAuth, account, token } = useStoreApp();
  const { showSuccess, showError } = useCustomSnackbar();

  return useMutation({
    mutationFn: accountApiRequest.update,
    onSuccess: data => {
      showSuccess('Cập nhật thông tin tài khoản thành công');

      if (data && data?.data) {
        const newData = { ...account, ...data.data };

        queryClient.setQueryData(['account'], newData);

        if (newData) {
          setAuth({ account: newData, token });
        }
      }
    },
    onError: (error: string) => {
      console.error('Lỗi:', error);
      showError(error);
    },
  });
};

export const useUpdatePassword = () => {
  const { showSuccess, showError } = useCustomSnackbar();

  return useMutation({
    mutationFn: accountApiRequest.update,
    onSuccess: data => {
      showSuccess('Cập nhật mật khẩu thành công');
    },
    onError: (error: string) => {
      console.error('Lỗi:', error);
      showError(error);
    },
  });
};
