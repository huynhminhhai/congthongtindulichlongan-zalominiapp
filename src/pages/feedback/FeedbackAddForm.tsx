import React, { useEffect, useMemo, useState } from "react"
import { Box, Input, Switch, useNavigate, useSnackbar, Button as ZMPButton } from "zmp-ui"
import { FormDataFeedback, schemaFeedback } from "./type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmModal } from "components/modal";
import { PrimaryButton } from "components/button";
import { FormControllerDatetimePicker, FormInputAreaField, FormInputField, FormSelectField, FormSwitchField } from "components/form";
import { useTranslation } from "react-i18next";
import { Button, Modal, Upload } from "antd";
import { Icon } from "@iconify/react";
import Label from "components/form/Label";
import { convertPetitionBody, feedbackApiRequest, getToken, useAddress, useCreateFeeback, useGetFeedbackChuyenMuc, useGetFeedbackLinhVuc, useGetListTinh } from "apiRequest/feedback";

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
    isPublic: false
};

const FeedbackAddForm: React.FC = () => {

    const { t: tCommon } = useTranslation("common");
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [moreAddressInfoUser, setMoreAddressInfoUser] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [linhVucId, setLinhVucId] = useState<any>(null);
    const [listFileUpload, setListFileUpload] = useState<any[]>([]);
    const [otp, setOTP] = useState("");
    const [countdown, setCountdown] = useState(120);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataFeedback>(defaultValues)

    const { handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FormDataFeedback>({
        resolver: yupResolver(schemaFeedback(moreAddressInfoUser)),
        defaultValues
    });

    /**
     * HANDLE COUNT DOWN
    **/
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenData: any = await getToken();
                setToken(tokenData?.access_token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, [setToken]);

    useEffect(() => {
        if (watch('tag_parent')) {
            setLinhVucId(watch('tag_parent'))
        }
    }, [watch('tag_parent')])

    const { mutateAsync: createFeedback, isPending } = useCreateFeeback();
    const { data: feedbackLinhVuc } = useGetFeedbackLinhVuc(!!token);
    const { data: feedbackChuyenMuc } = useGetFeedbackChuyenMuc(linhVucId);
    const { data: tinhs } = useGetListTinh(!!token);

    /**
     * HANDLE OPTIONS
    **/
    const feedbackLinhVucOptions = useMemo(() => {
        return feedbackLinhVuc?.data?.content?.map((item) => ({
            value: item.id,
            label: item.name
        })) || [];
    }, [feedbackLinhVuc]);

    const feedbackChuyenMucOptions = useMemo(() => {
        return feedbackChuyenMuc?.data?.content?.map((item) => ({
            value: item.id,
            label: item.name
        })) || [];
    }, [feedbackChuyenMuc]);

    const tinhOptions = useMemo(() => {
        return tinhs?.data?.map((item) => ({
            value: item.id,
            label: item.name
        })) || [];
    }, [tinhs]);

    /**
     * HANDLE SELECT ADDRESS
    **/
    const userAddress = useAddress({
        watchedTinh: watch('reporter_address_province'),
        watchedHuyen: watch('reporter_address_town'),
        setValue,
        nameHuyen: 'reporter_address_town',
        nameXa: 'reporter_address_village'
    });

    const feedbackAddress = useAddress({
        watchedTinh: '5def47c5f47614018c000080',
        watchedHuyen: watch('takePlaceTown'),
        setValue,
        nameHuyen: 'takePlaceTown',
        nameXa: 'takePlaceVillage'
    });

    const onSubmit: SubmitHandler<FormDataFeedback> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                const tagItem = feedbackChuyenMucOptions?.find((item) => item.value === formData.tag)
                const userAddressProvince = tinhOptions?.find((item) => item.value === formData.reporter_address_province)
                const userAddressTown = userAddress?.huyenOptions?.find((item) => item.value === formData.reporter_address_town)
                const userAddressVillage = userAddress?.xaOptions?.find((item) => item.value === formData.reporter_address_village)
                const feedbackAddressTown = feedbackAddress?.huyenOptions?.find((item) => item.value === formData.takePlaceTown)
                const feedbackAddressVillage = feedbackAddress?.xaOptions?.find((item) => item.value === formData.takePlaceVillage)

                let rs: any = convertPetitionBody(
                    {
                        ...formData,
                        tag: tagItem,
                        reporter_address_province: {
                            id: formData.reporter_address_province,
                            typeId: '5ee304423167922ac55bea01',
                            name: userAddressProvince?.label
                        },
                        reporter_address_town: {
                            id: formData.reporter_address_town,
                            typeId: '5ee304423167922ac55bea02',
                            name: userAddressTown?.label
                        },
                        reporter_address_village: {
                            id: formData.reporter_address_village,
                            typeId: '5ee304423167922ac55bea03',
                            name: userAddressVillage?.label
                        },
                        takePlaceTown: {
                            id: formData.takePlaceTown,
                            typeId: '5ee304423167922ac55bea02',
                            name: feedbackAddressTown?.label
                        },
                        takePlaceVillage: {
                            id: formData.takePlaceVillage,
                            typeId: '5ee304423167922ac55bea03',
                            name: feedbackAddressVillage?.label
                        }
                    },
                    listFileUpload,
                    moreAddressInfoUser,
                );

                if (listFileUpload.length === 0) {
                    openSnackbar({
                        icon: true,
                        text: 'Bạn chưa chọn tệp đính kèm',
                        type: 'warning',
                        action: { text: 'Đóng', close: true },
                        duration: 3000,
                    });

                    return;
                }

                if (rs?.tag) {
                    setCountdown(120)
                    setOTP("")
                    setIsModalOpen(true);
                    feedbackApiRequest.sendOTP(formData.reporter_phone)
                        .then((res) => {

                        })
                }

            } catch (error) {
                console.error("Error:", error);
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
        setOTP("")
        openSnackbar({
            icon: true,
            text: 'Mã OTP đã được gửi lại',
            type: 'success',
            action: { text: 'Đóng', close: true },
            duration: 3000,
        });
    };

    const handleConfirmOTP = () => {
        setSending(true)
        feedbackApiRequest.confirmOTP(formData.reporter_phone, otp)
            .then((res) => {
                if (res?.data?.code == 10014) {
                    openSnackbar({
                        icon: true,
                        text: res?.data?.message,
                        type: 'error',
                        action: { text: 'Đóng', close: true },
                        duration: 3000,
                    });
                    setSending(false)
                } else {
                    setIsModalOpen(false);
                    handleCreateFeedback()
                }
            }).catch(
                (error) => {
                    openSnackbar({
                        icon: true,
                        text: error?.response?.data?.message,
                        type: 'error',
                        action: { text: 'Đóng', close: true },
                        duration: 3000,
                    });
                    setSending(false)
                }
            )
    };

    async function handleCreateFeedback() {
        const tagItem = feedbackChuyenMucOptions?.find((item) => item.value === formData.tag)
        const userAddressProvince = tinhOptions?.find((item) => item.value === formData.reporter_address_province)
        const userAddressTown = userAddress?.huyenOptions?.find((item) => item.value === formData.reporter_address_town)
        const userAddressVillage = userAddress?.xaOptions?.find((item) => item.value === formData.reporter_address_village)
        const feedbackAddressTown = feedbackAddress?.huyenOptions?.find((item) => item.value === formData.takePlaceTown)
        const feedbackAddressVillage = feedbackAddress?.xaOptions?.find((item) => item.value === formData.takePlaceVillage)

        let rs: any = convertPetitionBody(
            {
                ...formData,
                tag: tagItem,
                reporter_address_province: {
                    id: formData.reporter_address_province,
                    typeId: '5ee304423167922ac55bea01',
                    name: userAddressProvince?.label
                },
                reporter_address_town: {
                    id: formData.reporter_address_town,
                    typeId: '5ee304423167922ac55bea02',
                    name: userAddressTown?.label
                },
                reporter_address_village: {
                    id: formData.reporter_address_village,
                    typeId: '5ee304423167922ac55bea03',
                    name: userAddressVillage?.label
                },
                takePlaceTown: {
                    id: formData.takePlaceTown,
                    typeId: '5ee304423167922ac55bea02',
                    name: feedbackAddressTown?.label
                },
                takePlaceVillage: {
                    id: formData.takePlaceVillage,
                    typeId: '5ee304423167922ac55bea03',
                    name: feedbackAddressVillage?.label
                }
            },
            listFileUpload,
            moreAddressInfoUser,
        );

        if (listFileUpload.length === 0) {
            openSnackbar({
                icon: true,
                text: 'Bạn chưa chọn tệp đính kèm',
                type: 'warning',
                action: { text: 'Đóng', close: true },
                duration: 3000,
            });

            return;
        }

        if (rs?.tag) {

            try {
                const res: any = await createFeedback(rs);

                if (res?.data) {
                    Modal.success({
                        title: (
                            <span>
                                Phản ánh về <b>{feedbackLinhVucOptions?.find((item) => item.value === formData?.tag_parent)?.label}</b> của bạn đã
                                được ghi nhận. Chân thành cảm ơn.
                            </span>
                        ),
                        content: (
                            <span>
                                Mã phản ánh: <b>{res?.data?.code}</b>
                            </span>
                        ),
                        onOk: () => {
                            navigate("/feedback");
                        },
                    });
                }

            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            openSnackbar({
                icon: true,
                text: rs,
                type: 'error',
                action: { text: 'Đóng', close: true },
                duration: 3000,
            });
        }
    }

    /**
    * HANDLE FILE UPLOAD
    **/
    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        fmData.append("files", file);
        try {
            let res = await feedbackApiRequest.uploadFile(fmData);
            if (res?.status === 200) {
                onSuccess(res?.data[0]);
                setListFileUpload([
                    ...listFileUpload,
                    { ...res?.data[0], group: 1, name: res?.data[0]?.filename },
                ]);
            } else {
                onError(res);
            }
        } catch (err) {
            onError({ err });
        }
    };

    const handleRemove = async (file: any) => {
        try {
            let res = await feedbackApiRequest.deleteFile(
                file?.response?.id,
            );
            if (res?.status === 200) {
                let rs: any[] = [];
                listFileUpload?.forEach((fileUp) => {
                    if (fileUp?.id !== file?.response?.id) {
                        rs.push(fileUp);
                    }
                });
                setListFileUpload(rs);
            }
        } catch (error) { }
    };

    return (
        <Box p={4} className="feedback-form">
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <h2 className="text-[18px] left-6 font-semibold mb-2">Thông tin cá nhân</h2>
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="reporter_fullname"
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            control={control}
                            error={errors.reporter_fullname?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="reporter_phone"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.reporter_phone?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="reporter_identityId"
                            label="CMND/CCCD"
                            placeholder="Nhập số CMND/CCCD"
                            control={control}
                            error={errors.reporter_identityId?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <div className="flex items-center gap-2 mb-2">
                            <Switch label="" onClick={() => setMoreAddressInfoUser(!moreAddressInfoUser)} />
                            <span className="font-medium">Cập nhật địa chỉ của tôi</span>
                        </div>
                    </div>
                    {moreAddressInfoUser && (
                        <div className="p-2 bg-[#f8f9fa] col-span-12 rounded-lg">
                            <div className="col-span-12">
                                <FormSelectField
                                    name="reporter_address_province"
                                    label="Tỉnh/Thành phố"
                                    placeholder="Chọn Tỉnh/Thành phố"
                                    control={control}
                                    options={tinhOptions}
                                    error={errors.reporter_address_province?.message}
                                />
                            </div>
                            <div className="col-span-12">
                                <FormSelectField
                                    name="reporter_address_town"
                                    label="Quận/Huyện"
                                    placeholder="Chọn Quận/Huyện"
                                    control={control}
                                    options={userAddress?.huyenOptions}
                                    error={errors.reporter_address_town?.message}
                                />
                            </div>
                            <div className="col-span-12">
                                <FormSelectField
                                    name="reporter_address_village"
                                    label="Phường/Xã"
                                    placeholder="Chọn Phường/Xã"
                                    control={control}
                                    options={userAddress?.xaOptions}
                                    error={errors.reporter_address_village?.message}
                                />
                            </div>
                            <div className="col-span-12">
                                <FormInputField
                                    name="reporter_address_fullAddress"
                                    label="Địa chỉ chi tiết"
                                    placeholder="Nhập địa chỉ chi tiết"
                                    control={control}
                                    error={errors.reporter_address_fullAddress?.message}
                                />
                            </div>
                        </div>
                    )}
                    <div className="col-span-12">
                        <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">Thông tin phản ánh</h2>
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="title"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.title?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="tag_parent"
                            label="Lĩnh vực phản ánh"
                            placeholder="Chọn lĩnh vực"
                            control={control}
                            options={feedbackLinhVucOptions}
                            error={errors.tag_parent?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="tag"
                            label="Chuyên mục phản ánh"
                            placeholder="Chọn chuyên mục"
                            control={control}
                            options={feedbackChuyenMucOptions}
                            error={errors.tag?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="description"
                            label="Nội dung phản ánh"
                            placeholder="Nhập nội dung phản ánh"
                            control={control}
                            error={errors.description?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">Địa điểm xảy ra</h2>
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="takePlaceTown"
                            label="Quận/Huyện"
                            placeholder="Chọn Quận/Huyện"
                            control={control}
                            options={feedbackAddress?.huyenOptions}
                            error={errors.takePlaceTown?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="takePlaceVillage"
                            label="Phường/Xã"
                            placeholder="Chọn Phường/Xã"
                            control={control}
                            options={feedbackAddress?.xaOptions}
                            error={errors.takePlaceVillage?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="fullAddress"
                            label="Địa chỉ chi tiết"
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.fullAddress?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatetimePicker
                            name="takePlaceOn"
                            label="Chọn ngày giờ"
                            placeholder="Chọn ngày và giờ"
                            control={control}
                            error={errors.takePlaceOn?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <Box pb={4}>
                            <Label required={true} text='Tệp đính kèm' />
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
                                    icon={<Icon icon='lucide:upload' className="mt-1" fontSize={18} />}
                                    className="w-full h-[38px] font-medium gap-1"
                                >
                                    Thêm tệp đính kèm
                                </Button>
                            </Upload>
                        </Box>
                    </div>
                    <div className="col-span-12">
                        <h2 className="text-[18px] left-6 font-semibold mt-2 mb-2">Công khai</h2>
                    </div>
                    <div className="col-span-6">
                        <FormSwitchField
                            name="isAnonymous"
                            label="Thông tin cá nhân"
                            control={control}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSwitchField
                            name="isPublic"
                            label="Phản ánh"
                            control={control}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={isPending ? `${tCommon('processing')}` : `${tCommon('send-feedback')}`} handleClick={handleSubmit(onSubmit)} disabled={isPending} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi phản ánh này không?"
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
                    <h3 className="text-[20px] text-[#355933] font-semibold">XÁC THỰC OTP</h3>
                    <p className="text-[16px] font-medium">Mã xác thực đã gửi đến số điện thoại</p>
                    <p className="text-[16px] font-semibold">*********{formData?.reporter_phone?.slice(-3)}</p>
                </div>
                <div style={{ marginTop: 16 }}>
                    {/* <TextField
                        label="Mã xác thực *"
                        style={{ width: "100%" }}
                        placeholder="Nhập mã xác thực"
                        value={otp}
                        size="small"
                        variant="outlined"
                        onChange={(e) => setOTP(e.target.value)}
                    /> */}
                    <Input.OTP
                        defaultValue=""
                        value={otp}
                        otpLength={6}
                        show
                        onChange={(e) => setOTP(e.target.value)}
                        className="w-full"
                    />
                    <p className="text-[14px] text-center font-medium">
                        Mã xác thực sẽ hết hạn sử dụng trong <span className="text-red-500"><b>{countdown} giây</b></span>
                    </p>
                </div>
                <div className="flex justify-between gap-3" style={{ marginTop: 16 }}>
                    <Button className="!bg-blue-100 !text-blue-500 !py-5 !px-6 !border-0 w-full" onClick={handleResendCode} disabled={countdown > 0}>
                        Gửi lại mã
                    </Button>
                    <Button className="!bg-[#355933] !text-white !py-5 !px-6 !border-0 w-full" onClick={handleConfirmOTP} disabled={otp?.length < 6}>
                        Tiếp tục
                    </Button>
                </div>
            </Modal>
        </Box>
    )
}

export default FeedbackAddForm