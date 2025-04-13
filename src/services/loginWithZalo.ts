import { useGetUserInfo, useLoginZalo } from 'apiRequest/auth';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useSnackbar } from 'zmp-ui';

import { HttpError } from './http';
import { getAccessTokenAccount, getPhoneNumberAccount, getUser } from './zalo';

export const useLoginWithZalo = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { setIsLoadingFullScreen, setAccount } = useStoreApp();
  const { mutateAsync: loginMutation } = useLoginZalo();
  const { mutateAsync: getUserInfo } = useGetUserInfo();

  const loginWithZalo = async (redirectUrl?: string) => {
    setIsLoadingFullScreen(true);

    try {
      const zaloInfo = await getUser();
      const phoneNumberCode = await getPhoneNumberAccount();
      if (phoneNumberCode && zaloInfo) {
        const accessTokenZalo = await getAccessTokenAccount();
        await loginMutation({
          access_token: accessTokenZalo,
          code: phoneNumberCode,
          providerKey: zaloInfo.id,
          userName: zaloInfo.name,
          avatar: zaloInfo.avatar,
        });
        const accountInfo = await getUserInfo();
        setAccount(accountInfo);
      }
    } catch (error: any) {
      openSnackbar({
        icon: true,
        text: error.message,
        type: 'error',
        action: { text: 'Đóng', close: true },
        duration: 5000,
      });
    }
    setIsLoadingFullScreen(false);
    //     // navigate(redirectUrl || '/account');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   if ((error as any).code === -201) {
    //     openSnackbar({
    //       icon: true,
    //       text: 'Bạn đã từ chối đăng nhập bằng số điện thoại',
    //       type: 'error',
    //       action: { text: 'Đóng', close: true },
    //       duration: 5000,
    //     });
    //   } else {
    //     openSnackbar({
    //       icon: true,
    //       text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
    //       type: 'error',
    //       action: { text: 'Đóng', close: true },
    //       duration: 5000,
    //     });
    //   }
    // } finally {
    //   setIsLoadingFullScreen(false);
    // }
  };

  return { loginWithZalo };
};
