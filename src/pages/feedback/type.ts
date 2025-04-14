import { t } from 'i18next';
import * as yup from 'yup';

export const schemaFeedback = (moreAddressInfoUser: boolean) =>
  yup.object().shape({
    reporter_fullname: yup.string().required('Không được để trống'),
    reporter_phone: yup.string().required('Không được để trống'),
    reporter_identityId: yup.string().required('Không được để trống'),
    title: yup.string().required('Không được để trống'),
    tag_parent: yup.string().required('Chưa chọn mục này'),
    tag: yup.string().required('Chưa chọn mục này'),
    description: yup.string().required('Không được để trống'),
    takePlaceTown: yup.string().required('Chưa chọn mục này'),
    takePlaceVillage: yup.string().required('Chưa chọn mục này'),
    takePlaceOn: yup.string().required('Chưa chọn mục này'),
    fullAddress: yup.string().required('Không được để trống'),
    isAnonymous: yup.boolean().required('Chưa chọn mục này'),
    isPublic: yup.boolean().required('Chưa chọn mục này'),

    reporter_address_province: yup
      .string()
      .typeError('Chưa chọn mục này')
      .test('required-or-empty', 'Chưa chọn mục này', function (value) {
        if (moreAddressInfoUser && (value === undefined || value === null || value === '')) {
          return this.createError({ message: 'Chưa chọn mục này' });
        }

        return true;
      }),
    reporter_address_town: yup
      .string()
      .typeError('Chưa chọn mục này')
      .test('required-or-empty', 'Chưa chọn mục này', function (value) {
        if (moreAddressInfoUser && (value === undefined || value === null || value === '')) {
          return this.createError({ message: 'Chưa chọn mục này' });
        }

        return true;
      }),
    reporter_address_village: yup
      .string()
      .typeError('Chưa chọn mục này')
      .test('required-or-empty', 'Chưa chọn mục này', function (value) {
        if (moreAddressInfoUser && (value === undefined || value === null || value === '')) {
          return this.createError({ message: 'Chưa chọn mục này' });
        }

        return true;
      }),

    reporter_address_fullAddress: yup
      .string()
      .typeError('Chưa chọn mục này')
      .test('required-or-empty', 'Chưa chọn mục này', function (value) {
        if (moreAddressInfoUser && (value === undefined || value === null || value === '')) {
          return this.createError({ message: 'Không được để trống' });
        }

        return true;
      }),
  });

export type FormDataFeedback = {
  reporter_fullname: string;
  reporter_phone: string;
  reporter_identityId: string;
  reporter_address_province?: string;
  reporter_address_town?: string;
  reporter_address_village?: string;
  reporter_address_fullAddress?: string;
  title: string;
  tag_parent: string;
  tag: string;
  description: string;
  takePlaceTown: string;
  takePlaceVillage: string;
  takePlaceOn: string;
  fullAddress: string;
  isAnonymous: boolean;
  isPublic: boolean;
};
