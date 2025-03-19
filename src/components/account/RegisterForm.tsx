import React, { useState } from "react"
import { Box, Button, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataRegister, schemaRegister } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormInputField } from "components/form"
import { Icon } from "@iconify/react"

const defaultValues: FormDataRegister = {
    fullname: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
}

const RegisterForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataRegister>(defaultValues)
    const [isHidePw, setIsHidePw] = useState<boolean>(true)
    const [isHideCPw, setIsHideCPw] = useState<boolean>(true)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataRegister>({
        resolver: yupResolver(schemaRegister),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataRegister> = (data) => {
        setFormData(data)

        if (data) {
            fetchApi()
        }
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api login with: ', { ...formData });

            openSnackbar({
                icon: true,
                text: "Đổi mật khẩu thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box px={4} pb={4} className="login-form">
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:user' fontSize={20} color="#355933" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="fullname"
                            label=""
                            placeholder="Họ tên"
                            control={control}
                            error={errors.fullname?.message}
                        />
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='ic:baseline-phone' fontSize={20} color="#355933" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="phoneNumber"
                            label=""
                            placeholder="Số điện thoại"
                            control={control}
                            error={errors.phoneNumber?.message}
                        />
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="#355933" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="password"
                            type={isHidePw ? 'password' : 'text'}
                            label=""
                            placeholder="Mật khẩu mới"
                            control={control}
                            error={errors.password?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHidePw(!isHidePw)}>

                            {
                                isHidePw ? <Icon fontSize={20} color="#355933" icon='mdi:eye-off' /> : <Icon fontSize={20} color="#355933" icon='mdi:eye' />
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="#355933" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="confirmPassword"
                            type={isHideCPw ? 'password' : 'text'}
                            label=""
                            placeholder="Xác nhận mật khẩu mới"
                            control={control}
                            error={errors.confirmPassword?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHideCPw(!isHideCPw)}>

                            {
                                isHideCPw ? <Icon fontSize={20} color="#355933" icon='mdi:eye-off' /> : <Icon fontSize={20} color="#355933" icon='mdi:eye' />
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative mt-[40px]">
                        <Button fullWidth onClick={handleSubmit(onSubmit)}>
                            {loading ? "Đang xử lý..." : "Đăng ký"}
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default RegisterForm