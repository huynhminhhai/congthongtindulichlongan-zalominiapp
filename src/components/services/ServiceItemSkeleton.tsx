import { Skeleton } from 'antd';
import React from 'react';
import { Box } from 'zmp-ui';

const ServiceItemSkeleton: React.FC = () => {
  return (
    <Box className="flex-center flex-col gap-2">
      <div className="flex-center w-[45px] h-[45px]">
        <Skeleton.Avatar active shape="circle" size={45} />
      </div>
      <div className="!w-[50px] !h-[18px]">
        <Skeleton.Input active className="!w-[50px] !h-[18px] overflow-hidden" />
      </div>
    </Box>
  );
};

export default ServiceItemSkeleton;
