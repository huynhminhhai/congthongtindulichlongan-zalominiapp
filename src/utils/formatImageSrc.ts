export const formatImageSrc = (src: string): string => {
  if (!src) return '';
  const result = `${import.meta.env.VITE_API_DOMAIN}${src}`;
  return result;
};
