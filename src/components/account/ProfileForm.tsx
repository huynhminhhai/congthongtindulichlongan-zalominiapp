import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateAccount } from 'apiRequest/account';
import { PrimaryButton } from 'components/button';
import { FormAvatarUploaderSingle, FormControllerDatePicker, FormInputField, FormSelectField } from 'components/form';
import { ConfirmModal } from 'components/modal';
import { gender } from 'constants/mock';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStoreApp } from 'store/store';
import { Box } from 'zmp-ui';

import { FormDataProfile, schemaProfile } from './type';
import { omit } from 'lodash';

const defaultValues: FormDataProfile = {
  userName: '',
  email: '',
  fullName: '',
  phoneNumber: '',
  avatar: '',
  gender: 0,
  birthOfDate: null,
};

const ProfileForm: React.FC = () => {

  const { account, setAuth, currentLanguage } = useStoreApp();
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormDataProfile>(defaultValues);

  const { mutateAsync, isPending } = useUpdateAccount();
  const t = currentLanguage.value;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataProfile>({
    resolver: yupResolver(schemaProfile()),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormDataProfile> = data => {
    setConfirmVisible(true);
    setFormData(data);
  };

  useEffect(() => {
    if (account) {
      reset(account);
      setFormData(account);
    }
  }, [account, setAuth]);

  const handleConfirm = async () => {
    setConfirmVisible(false);
    if (formData) {
      try {

        const dataSubmit = { ...omit(formData, ['userId', 'userName']) };

        await mutateAsync({ ...dataSubmit, changePassword: false });

      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <Box p={4}>
      <Box>
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12">
            <FormAvatarUploaderSingle
              name="avatar"
              label={t['UploadPhoto']}
              control={control}
              error={errors.avatar?.message}
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="fullName"
              label={t['NamePlaceholder']}
              placeholder={t['EnterName']}
              control={control}
              error={errors.fullName?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="phoneNumber"
              label={t['Phone']}
              placeholder={t['EnterPhone']}
              control={control}
              error={errors.phoneNumber?.message}
              required
              disabled
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="email"
              label="Email"
              placeholder="Email"
              control={control}
              error={errors.email?.message}
            />
          </div>
          <div className="col-span-12">
            <FormControllerDatePicker
              name="birthOfDate"
              label={t['BirthDate']}
              control={control}
              placeholder={t['EnterBirthDate']}
              required
              error={errors.birthOfDate?.message}
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="gender"
              label={t['Gender']}
              placeholder={t['EnterGender']}
              control={control}
              options={gender}
              error={errors.gender?.message}
              required
            />
          </div>
          <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
              <PrimaryButton
                disabled={isPending}
                fullWidth
                label={isPending ? `${t['Processing']}` : `${t['UpdateInfor']}`}
                handleClick={handleSubmit(onSubmit)}
              />
            </Box>
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

export default ProfileForm;
