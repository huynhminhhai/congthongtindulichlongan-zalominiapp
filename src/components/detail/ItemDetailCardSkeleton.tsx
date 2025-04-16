import { Skeleton } from 'antd';
import React from 'react';
import { Box } from 'zmp-ui';

const ItemDetailCardSkeleton: React.FC = () => {
  return (
    <Box flex className="gap-3">
      <div className="w-[120px] h-[80px] rounded-lg overflow-hidden">
        <Skeleton.Image active className="!w-full !h-full !rounded-lg" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="flex-1">
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: 2,
            width: ['80%', '100%'],
          }}
          className="!mt-0"
        />
      </div>
    </Box>
  );
};

export default ItemDetailCardSkeleton;
