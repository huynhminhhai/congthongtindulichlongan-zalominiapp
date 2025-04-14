import { Icon } from '@iconify/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreApp } from 'store/store';
import { Box } from 'zmp-ui';

type TitleSectionType = {
  title: string;
  mB?: number;
  handleClick?: () => void;
};

const TitleSection: React.FC<TitleSectionType> = ({ title, mB = 4, handleClick }) => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Box mb={mB}>
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">{title}</h3>
        {handleClick && (
          <div
            className="text-[#355933] text-[16px] leading-[1] font-semibold flex items-center gap-1"
            onClick={handleClick}
          >
            <span>{t['ButtonViewAll']}</span> <Icon fontSize={16} icon="mingcute:right-line" />
          </div>
        )}
      </div>
    </Box>
  );
};

export default TitleSection;
