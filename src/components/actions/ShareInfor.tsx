import images from 'assets/images';
import React from 'react';
import { openUrlInWebview } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { copyToClipboard } from 'utils/copyToClipboard';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import zmp from 'zmp-sdk';
import { Box } from 'zmp-ui';

const ShareInfor: React.FC = () => {
  const { showError, showSuccess } = useCustomSnackbar();
  const link = window.location.href;
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  const handleCopy = async () => {
    copyToClipboard(
      link,
      () => showSuccess(t['CopySuccess']),
      () => showError(t['CopyFailure'])
    );
  };

  const handleShareZalo = () => {
    zmp
      .openShareSheet({
        type: 'link',
        data: { link, chatOnly: false },
      })
      .then(() => {
        showSuccess(t['ShareSuccess']);
      })
      .catch(() => {
        showSuccess(t['ShareFailure']);
      });
  };

  const handleShareSocial = async (platform: string) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}`;
        break;
      default:
        return;
    }

    try {
      await openUrlInWebview(shareUrl, 'bottomSheet');
    } catch (err) {
      console.error('Lỗi mở WebView:', err);
    }
  };

  return (
    <Box pb={4} pt={8}>
      <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{t['Share']}</h3>
      <div className="flex flex-wrap mt-3 gap-4">
        <Box onClick={handleShareZalo}>
          <img className="w-[36px]" src={images.zalo} alt="Zalo" />
        </Box>
        <Box onClick={() => handleShareSocial('facebook')}>
          <img className="w-[36px]" src={images.facebook} alt="Facebook" />
        </Box>
        <Box onClick={() => handleShareSocial('twitter')}>
          <img className="w-[36px]" src={images.twitter} alt="Twitter" />
        </Box>
        <Box onClick={() => handleCopy()}>
          <img className="w-[36px]" src={images.link} alt="Copy" />
        </Box>
      </div>
    </Box>
  );
};

export default ShareInfor;
