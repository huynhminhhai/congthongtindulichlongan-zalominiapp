import * as yup from 'yup';

export const schemaComments = yup.object().shape({
  name: yup.string(),
  content: yup.string().required('Không được để trống'),
});

export type FormDataComments = {
  name?: string;
  content: string;
};
