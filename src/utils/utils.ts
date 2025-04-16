import dayjs from 'dayjs';

export const FORMAT_DATE = 'DD/MM/YYYY';

export const formatImageSrc = (src: string | undefined): string => {
  if (!src) return '';
  const result = `${import.meta.env.VITE_API_DOMAIN}${src}`;
  return result;
};

export const encodeQueryData = (data = {}) => {
  const obj = {
    ...data,
  };

  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(pair => pair.map((element: any) => encodeURIComponent(element)).join('='))
    .join('&');
};

export const formatDate = (date: Date | string | null, format = FORMAT_DATE): string => {
  if (!date) return '';
  return dayjs(date).format(format);
};
