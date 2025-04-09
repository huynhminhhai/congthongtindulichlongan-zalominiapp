import { MenuItemType } from 'apiRequest/menu/types';
import React from 'react';
import { formatImageSrc } from 'utils/formatImageSrc';
import { Box } from 'zmp-ui';

type ServiceItemType = {
  data: MenuItemType;
  onClick: () => void;
};

const ServiceItem: React.FC<ServiceItemType> = ({ data, onClick }) => {
  return (
    <Box onClick={onClick}>
      <div className="flex-center flex-col gap-2">
        <Box>
          <div className="flex-center w-[45px] h-[45px] relative">
            <img src={formatImageSrc(data.image)} alt={data?.text} />
          </div>
        </Box>
        <Box>
          <h4 className="text-[13px] leading-[18px] text-center font-medium">{data.text}</h4>
        </Box>
      </div>
    </Box>
  );
};

export default ServiceItem;
