import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { useGetUserInfo, useLoginAccount } from 'apiRequest/auth';
import { FormInputField } from 'components/form';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginWithZalo } from 'services/loginWithZalo';
import { setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Button, useNavigate, useSnackbar } from 'zmp-ui';

import { FormDataLogin, schemaLogin } from './type';

const defaultValues: FormDataLogin = {
  username: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAccount, setToken, currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { showError, showSuccess } = useCustomSnackbar();
  const { mutateAsync: loginAccount } = useLoginAccount();

  const { mutateAsync: getUserInfo } = useGetUserInfo();
  const { loginWithZalo } = useLoginWithZalo();

  const [loading, setLoading] = useState(false);
  const [isHide, setIsHide] = useState<boolean>(true);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(schemaLogin),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormDataLogin> = data => {
    if (data) {
      fetchApi(data);
    }
  };

  const fetchApi = async (data: FormDataLogin) => {
    setLoading(true);

    try {
      const res = await loginAccount({ username: data.username, password: data.password });
      await setDataToStorage('token', res.token);
      const accountInfo = await getUserInfo();
      setToken(res.token);
      setAccount(accountInfo);
      showSuccess(t['YouLoginSuccess']);
      navigate('/account');
    } catch (error: any) {
      showError(error.message);
    } finally {
      reset(defaultValues);
      setLoading(false);
    }
  };

  return (
    <Box p={4} className="login-form">
      <Box>
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12 relative">
            <Icon
              icon="mdi:user"
              fontSize={20}
              color="#355933"
              className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"
            />
            <FormInputField
              name="username"
              label=""
              placeholder="username"
              control={control}
              error={errors.username?.message}
            />
          </div>
          <div className="col-span-12 relative">
            <Icon
              icon="mdi:password"
              fontSize={20}
              color="#355933"
              className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"
            />
            <FormInputField
              name="password"
              type={isHide ? 'password' : 'text'}
              label=""
              placeholder={t['Password']}
              control={control}
              error={errors.password?.message}
            />
            <div
              className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]"
              onClick={() => setIsHide(prev => !prev)}
            >
              <Icon fontSize={20} color="#355933" icon={isHide ? 'mdi:eye-off' : 'mdi:eye'} />
            </div>
          </div>
          <div className="col-span-12 relative mt-[30px]">
            <Button disabled={loading} fullWidth onClick={handleSubmit(onSubmit)}>
              {loading ? `${t['Processing']}` : `${t['Login']}`}
            </Button>
            <div className="mt-[20px] font-medium">
              {t['LoginSub']}{' '}
              <span onClick={() => loginWithZalo()} className="font-semibold text-[#355933]">
                {t['LoginZalo']}
              </span>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default LoginForm;
