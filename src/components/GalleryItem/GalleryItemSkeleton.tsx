import { Skeleton } from 'antd';
import React from 'react';
import { Box } from 'zmp-ui';

const GalleryItemSkeleton: React.FC = () => {
  return (
    <Box className="relative w-full h-[240px] rounded-lg overflow-hidden bg-gray-200">
      {/* Skeleton for image */}
      <Skeleton.Image
        active
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        className="!w-full !h-full !object-cover"
      />
      {/* Overlay for title */}
      <div className="absolute w-full bottom-0 left-0 p-4 bg-[#365140e6]">
        <div className="flex items-center gap-2">
          {/* Skeleton icon */}
          <Skeleton.Avatar active size="small" shape="circle" />
          {/* Skeleton text */}
          <Skeleton.Input active size="small" className="w-3/4" />
        </div>
      </div>
    </Box>
  );
};

export default GalleryItemSkeleton;
