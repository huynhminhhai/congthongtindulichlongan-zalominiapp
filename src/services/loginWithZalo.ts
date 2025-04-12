import { useLoginZalo } from 'apiRequest/auth';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useSnackbar } from 'zmp-ui';

import { getAccessTokenAccount, getPhoneNumberAccount, getUser } from './zalo';

export const useLoginWithZalo = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { setIsLoadingFullScreen, token } = useStoreApp();
  const { mutateAsync } = useLoginZalo();

  const loginWithZalo = async (redirectUrl?: string) => {
    // if (token) {
    //   console.log('Đã đăng nhập');
    //   navigate(redirectUrl || '/account');
    //   return;
    // }
    const userInfo = await getUser();
    const phoneNumberCode = await getPhoneNumberAccount();
    // console.log('userInfo', userInfo);
    // console.log('phoneNumberCode', phoneNumberCode);
    // setIsLoadingFullScreen(true);

    try {
      if (phoneNumberCode) {
        const accessToken = await getAccessTokenAccount();
        // console.log('accessToken', accessToken);
        await mutateAsync({
          access_token: accessToken,
          code: phoneNumberCode,
          providerKey: userInfo.id,
          userName: userInfo.name,
          avatar: userInfo.avatar,
        });
      }
    } catch (error) {
      console.log('hello');
      // console.error('Error:', error);
    }

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
