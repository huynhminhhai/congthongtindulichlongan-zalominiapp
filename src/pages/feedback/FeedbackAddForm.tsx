import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { Button, Modal, Upload } from 'antd';
import {
  convertPetitionBody,
  feedbackApiRequest,
  getToken,
  useAddress,
  useCreateFeedback,
  useGetFeedbackChuyenMuc,
  useGetFeedbackLinhVuc,
  useGetListTinh,
} from 'apiRequest/feedback';
import { PrimaryButton } from 'components/button';
import {
  FormControllerDatetimePicker,
  FormInputAreaField,
  FormInputField,
  FormSelectField,
  FormSwitchField,
} from 'components/form';
import Label from 'components/form/Label';
import { ConfirmModal } from 'components/modal';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Input, Switch, useNavigate, useSnackbar, Button as ZMPButton } from 'zmp-ui';

import { FormDataFeedback, schemaFeedback } from './type';

const defaultValues: FormDataFeedback = {
  reporter_fullname: '',
  reporter_phone: '',
  reporter_identityId: '',
  reporter_address_province: '',
  reporter_address_town: '',
  reporter_address_village: '',
  reporter_address_fullAddress: '',
  title: '',
  tag_parent: '',
  tag: '',
  description: '',
  takePlaceTown: '',
  takePlaceVillage: '',
  takePlaceOn: '',
  fullAddress: '',
  isAnonymous: false,
  isPublic: false,
};

interface Option {
  value: string;
  label: string;
}

const FeedbackAddForm: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { showError, showSuccess, showWarning } = useCustomSnackbar();
  const navigate = useNavigate();

  const [moreAddressInfoUser, setMoreAddressInfoUser] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [linhVucId, setLinhVucId] = useState<any>(null);
  const [listFileUpload, setListFileUpload] = useState<any[]>([]);
  const [otp, setOTP] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormDataFeedback>(defaultValues);

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormDataFeedback>({
    resolver: yupResolver(schemaFeedback(moreAddressInfoUser)),
    defaultValues,
  });

  /**
   * HANDLE COUNT DOWN
   **/
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenData: any = await getToken();
        setToken(tokenData?.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, [setToken]);

  useEffect(() => {
    if (watch('tag_parent')) {
      setLinhVucId(watch('tag_parent'));
    }
  }, [watch('tag_parent')]);

  const { mutateAsync: createFeedback, isPending } = useCreateFeedback();

  const { data: feedbackLinhVuc } = useGetFeedbackLinhVuc(!!token);
  const { data: feedbackChuyenMuc } = useGetFeedbackChuyenMuc(linhVucId);
  const { data: tinhs } = useGetListTinh(!!token);

  /**
   * HANDLE OPTIONS
   **/
  const feedbackLinhVucOptions = useMemo(() => {
    return (
      feedbackLinhVuc?.data?.content?.map(item => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  }, [feedbackLinhVuc]);

  const feedbackChuyenMucOptions = useMemo(() => {
    return (
      feedbackChuyenMuc?.data?.content?.map(item => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  }, [feedbackChuyenMuc]);

  const tinhOptions = useMemo(() => {
    return (
      tinhs?.data?.map(item => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  }, [tinhs]);

  /**
   * HANDLE SELECT ADDRESS
   **/
  const userAddress = useAddress({
    watchedTinh: watch('reporter_address_province'),
    watchedHuyen: watch('reporter_address_town'),
    setValue,
    nameHuyen: 'reporter_address_town',
    nameXa: 'reporter_address_village',
  });

  const feedbackAddress = useAddress({
    watchedTinh: '5def47c5f47614018c000080',
    watchedHuyen: watch('takePlaceTown'),
    setValue,
    nameHuyen: 'takePlaceTown',
    nameXa: 'takePlaceVillage',
  });

  const onSubmit: SubmitHandler<FormDataFeedback> = data => {
    setConfirmVisible(true);
    setFormData(data);
  };

  /**
   * HANDLE CONVERT DATA
   **/

  const preparePetitionData = (
    formData: any,
    feedbackChuyenMucOptions: Option[] | undefined,
    tinhOptions: Option[] | undefined,
    userAddress: any,
    feedbackAddress: any,
    listFileUpload: File[],
    moreAddressInfoUser: any
  ): { data: any; isValid: boolean } => {
    const tagItem = feedbackChuyenMucOptions?.find(item => item.value === formData.tag);
    const userAddressProvince = tinhOptions?.find(item => item.value === formData.reporter_address_province);
    const userAddressTown = userAddress?.huyenOptions?.find(item => item.value === formData.reporter_address_town);
    const userAddressVillage = userAddress?.xaOptions?.find(item => item.value === formData.reporter_address_village);
    const feedbackAddressTown = feedbackAddress?.huyenOptions?.find(item => item.value === formData.takePlaceTown);
    const feedbackAddressVillage = feedbackAddress?.xaOptions?.find(item => item.value === formData.takePlaceVillage);

    // Kiểm tra tệp đính kèm
    if (listFileUpload.length === 0) {
      showWarning(t['FileNotSelected']);
      return { data: null, isValid: false };
    }

    // Chuyển đổi dữ liệu
    const convertedData = convertPetitionBody(
      {
        ...formData,
        tag: tagItem,
        reporter_address_province: {
          id: formData.reporter_address_province,
          typeId: '5ee304423167922ac55bea01',
          name: userAddressProvince?.label,
        },
        reporter_address_town: {
          id: formData.reporter_address_town,
          typeId: '5ee304423167922ac55bea02',
          name: userAddressTown?.label,
        },
        reporter_address_village: {
          id: formData.reporter_address_village,
          typeId: '5ee304423167922ac55bea03',
          name: userAddressVillage?.label,
        },
        takePlaceTown: {
          id: formData.takePlaceTown,
          typeId: '5ee304423167922ac55bea02',
          name: feedbackAddressTown?.label,
        },
        takePlaceVillage: {
          id: formData.takePlaceVillage,
          typeId: '5ee304423167922ac55bea03',
          name: feedbackAddressVillage?.label,
        },
      },
      listFileUpload,
      moreAddressInfoUser
    );

    if (!convertedData?.tag) {
      showError(t['InvalidData']);
      return { data: null, isValid: false };
    }

    return { data: convertedData, isValid: true };
  };

  const handleConfirm = async () => {
    setConfirmVisible(false);
    if (formData) {
      try {
        const { data: rs, isValid } = preparePetitionData(
          formData,
          feedbackChuyenMucOptions,
          tinhOptions,
          userAddress,
          feedbackAddress,
          listFileUpload,
          moreAddressInfoUser
        );

        if (!isValid) return;

        if (rs?.tag) {
          setCountdown(120);
          setOTP('');
          setIsModalOpen(true);
          feedbackApiRequest.sendOTP(formData.reporter_phone).then(res => {});
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  /**
   * HANDLE OTP
   **/

  const handleResendCode = () => {
    setCountdown(120);
    setOTP('');
    showSuccess(t['OTPRessend']);
  };

  const handleConfirmOTP = () => {
    setSending(true);
    feedbackApiRequest
      .confirmOTP(formData.reporter_phone, otp)
      .then(res => {
        if (res?.data?.code == 10014) {
          showError(res?.data?.message);
          setSending(false);
        } else {
          setIsModalOpen(false);
          handleCreateFeedback();
        }
      })
      .catch(error => {
        showError(error?.response?.data?.message);
        setSending(false);
      });
  };

  async function handleCreateFeedback() {
    const { data: rs, isValid } = preparePetitionData(
      formData,
      feedbackChuyenMucOptions,
      tinhOptions,
      userAddress,
      feedbackAddress,
      listFileUpload,
      moreAddressInfoUser
    );

    if (!isValid) return;

    if (rs?.tag) {
      try {
        const res: any = await createFeedback(rs);

        if (res?.data) {
          Modal.success({
            centered: true,
            title: <div className="text-[16px]">{t['FeedbackTitle']}</div>,

            onOk: () => {
              navigate('/');
            },
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      showError(rs);
    }
  }

  /**
   * HANDLE FILE UPLOAD
   **/
  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    fmData.append('files', file);
    try {
      let res = await feedbackApiRequest.uploadFile(fmData);
      if (res?.status === 200) {
        onSuccess(res?.data[0]);
        setListFileUpload([...listFileUpload, { ...res?.data[0], group: 1, name: res?.data[0]?.filename }]);
      } else {
        onError(res);
      }
    } catch (err) {
      onError({ err });
    }
  };

  const handleRemove = async (file: any) => {
    try {
      let res = await feedbackApiRequest.deleteFile(file?.response?.id);
      if (res?.status === 200) {
        let rs: any[] = [];
        listFileUpload?.forEach(fileUp => {
          if (fileUp?.id !== file?.response?.id) {
            rs.push(fileUp);
          }
        });
        setListFileUpload(rs);
      }
    } catch (error) {}
  };

  return (
    <Box p={4} className="feedback-form">
      <Box>
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12">
            <h2 className="text-[18px] left-6 font-semibold mb-2">{t['PersonalInformation']}</h2>
          </div>
          <div className="col-span-12">
            <FormInputField
              name="reporter_fullname"
              label={t['NamePlaceholder']}
              placeholder={t['EnterName']}
              control={control}
              error={errors.reporter_fullname?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              type="number"
              name="reporter_phone"
              label={t['Phone']}
              placeholder={t['EnterPhone']}
              control={control}
              error={errors.reporter_phone?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              type="number"
              name="reporter_identityId"
              label={t['IdentityNumber']}
              placeholder={t['EnterIdentityNumber']}
              control={control}
              error={errors.reporter_identityId?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <div className="flex items-center gap-2 mb-2">
              <Switch label="" onClick={() => setMoreAddressInfoUser(!moreAddressInfoUser)} />
              <span className="font-medium">{t['UpdateMyAddress']}</span>
            </div>
          </div>
          {moreAddressInfoUser && (
            <div className="p-2 bg-[#f8f9fa] col-span-12 rounded-lg">
              <div className="col-span-12">
                <FormSelectField
                  name="reporter_address_province"
                  label={t['Province']}
                  placeholder={t['ChooseProvince']}
                  control={control}
                  options={tinhOptions}
                  error={errors.reporter_address_province?.message}
                />
              </div>
              <div className="col-span-12">
                <FormSelectField
                  name="reporter_address_town"
                  label={t['District']}
                  placeholder={t['ChooseDistrict']}
                  control={control}
                  options={userAddress?.huyenOptions}
                  error={errors.reporter_address_town?.message}
                />
              </div>
              <div className="col-span-12">
                <FormSelectField
                  name="reporter_address_village"
                  label={t['Commune']}
                  placeholder={t['ChooseCommune']}
                  control={control}
                  options={userAddress?.xaOptions}
                  error={errors.reporter_address_village?.message}
                />
              </div>
              <div className="col-span-12">
                <FormInputField
                  name="reporter_address_fullAddress"
                  label={t['DetailedAddress']}
                  placeholder={t['EnterDetailedAddress']}
                  control={control}
                  error={errors.reporter_address_fullAddress?.message}
                />
              </div>
            </div>
          )}
          <div className="col-span-12">
            <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">{t['FeedbackInformation']}</h2>
          </div>
          <div className="col-span-12">
            <FormInputField
              name="title"
              label={t['Title']}
              placeholder={t['EnterTitle']}
              control={control}
              error={errors.title?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="tag_parent"
              label={t['FeedbackArea']}
              placeholder={t['ChooseField']}
              control={control}
              options={feedbackLinhVucOptions}
              error={errors.tag_parent?.message}
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="tag"
              label={t['FeedbackCategory']}
              placeholder={t['ChooseFeedbackCategory']}
              control={control}
              options={feedbackChuyenMucOptions}
              error={errors.tag?.message}
            />
          </div>
          <div className="col-span-12">
            <FormInputAreaField
              name="description"
              label={t['FeedbackContent']}
              placeholder={t['EnterFeedbackContent']}
              control={control}
              error={errors.description?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">{t['PlaceDetails']}</h2>
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="takePlaceTown"
              label={t['District']}
              placeholder={t['ChooseDistrict']}
              control={control}
              options={feedbackAddress?.huyenOptions}
              error={errors.takePlaceTown?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="takePlaceVillage"
              label={t['Commune']}
              placeholder={t['ChooseCommune']}
              control={control}
              options={feedbackAddress?.xaOptions}
              error={errors.takePlaceVillage?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="fullAddress"
              label={t['DetailedAddress']}
              placeholder={t['EnterDetailedAddress']}
              control={control}
              error={errors.fullAddress?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <FormControllerDatetimePicker
              name="takePlaceOn"
              label={t['ChooseDateTime']}
              placeholder={t['ChooseDateAndTime']}
              control={control}
              error={errors.takePlaceOn?.message}
              required
            />
          </div>
          <div className="col-span-12">
            <Box pb={4}>
              <Label required={true} text={t['AttachmentFile']} />
              <Upload
                multiple
                listType="picture"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                                text/plain, application/pdf, .jpg, .jpeg, .png, .xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, .mp4, .mp3"
                className="w-full block"
                customRequest={uploadImage}
                onRemove={handleRemove}
              >
                <Button
                  icon={<Icon icon="lucide:upload" className="mt-1" fontSize={18} />}
                  className="w-full h-[38px] font-medium gap-1"
                >
                  {t['AddAttachment']}
                </Button>
              </Upload>
            </Box>
          </div>
          <div className="col-span-12">
            <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">{t['Public']}</h2>
          </div>
          <div className="col-span-6">
            <FormSwitchField name="isAnonymous" label={t['PersonalInformation']} control={control} required />
          </div>
          <div className="col-span-6">
            <FormSwitchField name="isPublic" label={t['Feedback']} control={control} required />
          </div>
          <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
              <PrimaryButton
                fullWidth
                label={isPending ? `${t['Processing']}` : `${t['SendFeedback']}`}
                handleClick={handleSubmit(onSubmit)}
                disabled={isPending}
              />
            </Box>
          </div>
        </div>
      </Box>
      <ConfirmModal
        visible={isConfirmVisible}
        title={t['ConfirmTitle']}
        message={t['ConfirmSendFeedbackMessage']}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Modal
        title={null}
        open={isModalOpen}
        maskClosable={false}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-center">
          <h3 className="text-[20px] text-[#355933] font-semibold"> {t['OtpVerificationTitle']}</h3>
          <p className="text-[16px] font-medium"> {t['OtpSentMessage']}</p>
          <p className="text-[16px] font-semibold">*********{formData?.reporter_phone?.slice(-3)}</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <Input.OTP
            defaultValue=""
            value={otp}
            otpLength={6}
            show
            onChange={e => setOTP(e.target.value)}
            className="w-full"
          />
          <p className="text-[14px] text-center font-medium">
            {t['OtpExpireMessage']}{' '}
            <span className="text-red-500">
              <b>
                {countdown} {t['Seconds']}
              </b>
            </span>
          </p>
        </div>
        <div className="flex justify-between gap-3" style={{ marginTop: 16 }}>
          <Button
            className="!bg-blue-100 !text-blue-500 !py-5 !px-6 !border-0 w-full"
            onClick={handleResendCode}
            disabled={countdown > 0}
          >
            {t['ResendOtpButton']}
          </Button>
          <Button
            className="!bg-[#355933] !text-white !py-5 !px-6 !border-0 w-full"
            onClick={handleConfirmOTP}
            disabled={otp?.length < 6}
          >
            {t['ContinueButton']}
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default FeedbackAddForm;
