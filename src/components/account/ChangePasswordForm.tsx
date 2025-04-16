import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { FormInputField } from 'components/form';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStoreApp } from 'store/store';
import { Box, Button } from 'zmp-ui';

import { FormDataChangePassword, schemaChangePassword } from './type';
import { useUpdatePassword } from 'apiRequest/account';
import { ConfirmModal } from 'components/modal';

const defaultValues: FormDataChangePassword = {
  password: '',
  // oldPassword: '',
  confirmPassword: '',
};

const ChangePasswordForm: React.FC = () => {

  const { currentLanguage, account } = useStoreApp();
  const t = currentLanguage.value;

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormDataChangePassword>(defaultValues);
  const [isHidePw, setIsHidePw] = useState<boolean>(true);
  const [isHideOPw, setIsHideOPw] = useState<boolean>(true);
  const [isHideCPw, setIsHideCPw] = useState<boolean>(true);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataChangePassword>({
    resolver: yupResolver(schemaChangePassword),
    defaultValues,
  });

  const { mutateAsync, isPending } = useUpdatePassword();

  const onSubmit: SubmitHandler<FormDataChangePassword> = data => {
    setConfirmVisible(true);
    setFormData(data);
  };

  const handleConfirm = async () => {
    setConfirmVisible(false);
    if (formData) {
      try {

        const dataSubmit = {
          Password: formData.password,
          ConfirmPassword: formData.confirmPassword,
          PassCode: null,
          changePassword: true,
          fullName: account?.fullName,
        };

        await mutateAsync({ ...dataSubmit, changePassword: true });

        reset(defaultValues);

      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <Box px={4} pb={4} className="login-form">
      <Box>
        <div className="grid grid-cols-12 gap-x-3">
          {/* <div className="col-span-12 relative">
            <Icon
              icon="mdi:password"
              fontSize={20}
              color="#355933"
              className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"
            />
            <FormInputField
              name="oldPassword"
              type={isHideOPw ? 'password' : 'text'}
              label=""
              placeholder={t['OldPassword']}
              control={control}
              error={errors.oldPassword?.message}
            />
            <div
              className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]"
              onClick={() => setIsHideOPw(!isHideOPw)}
            >
              {isHideOPw ? (
                <Icon fontSize={20} color="#355933" icon="mdi:eye-off" />
              ) : (
                <Icon fontSize={20} color="#355933" icon="mdi:eye" />
              )}
            </div>
          </div> */}
          <div className="col-span-12 relative">
            <Icon
              icon="mdi:password"
              fontSize={20}
              color="#355933"
              className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"
            />
            <FormInputField
              name="password"
              type={isHidePw ? 'password' : 'text'}
              label=""
              placeholder={t['NewPassword']}
              control={control}
              error={errors.password?.message}
            />
            <div
              className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]"
              onClick={() => setIsHidePw(!isHidePw)}
            >
              {isHidePw ? (
                <Icon fontSize={20} color="#355933" icon="mdi:eye-off" />
              ) : (
                <Icon fontSize={20} color="#355933" icon="mdi:eye" />
              )}
            </div>
          </div>
          <div className="col-span-12 relative">
            <Icon
              icon="mdi:password"
              fontSize={20}
              color="#355933"
              className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"
            />
            <FormInputField
              name="confirmPassword"
              type={isHideCPw ? 'password' : 'text'}
              label=""
              placeholder={t['ConfirmPassword']}
              control={control}
              error={errors.confirmPassword?.message}
            />
            <div
              className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]"
              onClick={() => setIsHideCPw(!isHideCPw)}
            >
              {isHideCPw ? (
                <Icon fontSize={20} color="#355933" icon="mdi:eye-off" />
              ) : (
                <Icon fontSize={20} color="#355933" icon="mdi:eye" />
              )}
            </div>
          </div>
          <div className="col-span-12 relative mt-[40px]">
            <Button disabled={isPending} fullWidth onClick={handleSubmit(onSubmit)} className="capitalize">
              {isPending ? `${t['Processing']}` : `${t['ChangePw']}`}
            </Button>
          </div>
        </div>
      </Box>
      <ConfirmModal
        visible={isConfirmVisible}
        title={t['Confirm']}
        message={t['ConfirmUpdateAccount']}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default ChangePasswordForm;
