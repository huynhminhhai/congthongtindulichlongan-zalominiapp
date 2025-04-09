import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreApp } from 'store/store';
import { Box } from 'zmp-ui';

const BannerSlider: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const { Welcome1, Welcome2, Welcome3 } = currentLanguage.value;
  return (
    <Box className="banner-silder">
      <Box className="bg-[#fff] relative overflow-hidden" py={6} px={4}>
        <img
          className="absolute left-[65%] top-[0] w-[100%] h-auto translate-x-[-15%] translate-y-[5%]"
          src="https://pngimg.com/d/world_map_PNG28.png"
          alt="shape-map"
        />
        <h1 className="text-[28px] leading-[38px] text-[#000] font-bold mb-1">
          <div>{Welcome1}</div>
          <div>{Welcome2}</div>
          <div>
            {Welcome3} <span className="text-[#355933]">LONG AN</span>
          </div>
        </h1>
      </Box>
    </Box>
  );
};

export default BannerSlider;
