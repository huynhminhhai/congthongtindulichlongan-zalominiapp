import { useGetUserInfo, useLoginZalo } from 'apiRequest/auth';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { useSnackbar } from 'zmp-ui';

import { HttpError } from './http';
import { getAccessTokenAccount, getPhoneNumberAccount, getUser, setDataToStorage } from './zalo';

export const useLoginWithZalo = () => {
  const { openSnackbar } = useSnackbar();
  const { setIsLoadingFullScreen, setAccount, setToken, currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { mutateAsync: loginMutation } = useLoginZalo();
  const { mutateAsync: getUserInfo } = useGetUserInfo();
  const { showError, showSuccess } = useCustomSnackbar();
  const loginWithZalo = async (redirectUrl?: string) => {
    setIsLoadingFullScreen(true);

    try {
      const zaloInfo = await getUser();
      const phoneNumberCode = await getPhoneNumberAccount();
      if (phoneNumberCode && zaloInfo) {
        const accessTokenZalo = await getAccessTokenAccount();
        const res = await loginMutation({
          access_token: accessTokenZalo,
          code: phoneNumberCode,
          providerKey: zaloInfo.id,
          userName: zaloInfo.name,
          avatar: zaloInfo.avatar,
        });
        await setDataToStorage('token', res.token);
        const accountInfo = await getUserInfo();
        setToken(res.token);
        setAccount(accountInfo);
        showSuccess(t['LoginSuccess']);
      }
    } catch (error: any) {
      showError(t['LoginFailed']);
    }
    setIsLoadingFullScreen(false);
  };

  return { loginWithZalo };
};
