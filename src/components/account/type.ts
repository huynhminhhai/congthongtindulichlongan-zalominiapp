import * as yup from 'yup';

import { gender } from './../../constants/mock';

export const schemaLogin = yup.object().shape({
  username: yup.string().required('Không được để trống'),
  password: yup.string().required('Không được để trống'),
});

export type FormDataLogin = {
  username: string;
  password: string;
};

export const schemaProfile = yup.object().shape({
  fullname: yup.string().required('Không được để trống'),
  phoneNumber: yup.string().required('Không được để trống'),
});

export type FormDataProfile = {
  userName: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  gender?: number;
  birthOfDate?: string | null;
};

export const schemaChangePassword = yup.object().shape({
  oldPassword: yup.string().required('Không được để trống'),
  password: yup.string().required('Không được để trống'),
  confirmPassword: yup
    .string()
    .required('Không được để trống')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});

export type FormDataChangePassword = {
  oldPassword: string;
  confirmPassword: string;
  password: string;
};

export const schemaRegister = yup.object().shape({
  fullname: yup.string().required('Không được để trống'),
  phoneNumber: yup.string().required('Không được để trống'),
  password: yup.string().required('Không được để trống'),
  confirmPassword: yup
    .string()
    .required('Không được để trống')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});

export type FormDataRegister = {
  fullname: string;
  phoneNumber: string;
  confirmPassword: string;
  password: string;
};
