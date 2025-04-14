import { useStoreApp } from 'store/store';
import { useSnackbar } from 'zmp-ui';

export const useCustomSnackbar = () => {
  const { openSnackbar } = useSnackbar();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const showSnackbar = options => {
    openSnackbar({
      icon: true,
      action: { text: t['Close'], close: true },
      duration: 3000,
      ...options,
    });
  };

  const showError = (text: string) =>
    showSnackbar({
      text,
      type: 'error',
    });

  const showSuccess = (text: string) =>
    showSnackbar({
      text,
      type: 'success',
    });

  return {
    showSnackbar,
    showError,
    showSuccess,
  };
};
