import { Skeleton } from 'antd';
import React from 'react';
import { Box } from 'zmp-ui';

const VideoItemSkeleton: React.FC = () => {
  return (
    <Box className="relative w-full h-[240px] rounded-lg overflow-hidden">
      {/* Skeleton hình ảnh */}
      <Skeleton.Image
        active
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0.5rem',
          objectFit: 'cover',
        }}
        className="!w-full !h-full !rounded-lg"
      />

      {/* Overlay khung chữ */}
      <div className="absolute bottom-0 w-full p-4 bg-[#365140e6]">
        <Skeleton active paragraph={false} title={{ width: '80%' }} className="!bg-transparent" />
      </div>
    </Box>
  );
};

export default VideoItemSkeleton;
