import { Skeleton } from 'antd';
import React from 'react';
import { Box } from 'zmp-ui';

const PostSkeleton = ({ gridColumn = 1, count = 6 }: { gridColumn?: number, count?: number }) => {
  return (
    <div className={`grid gap-4 grid-cols-${gridColumn}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} className="rounded-xl border border-gray-200 overflow-hidden bg-white p-4">
          <Skeleton.Image className="!w-full" style={{ width: '100%', height: 140, borderRadius: 8 }} active />
          <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 1, width: ['50%'] }} className="mt-2 p-2" />
        </Box>
      ))}
    </div>
  );
};

export default PostSkeleton;
