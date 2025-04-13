import { Skeleton } from 'antd';
import TitleSection from 'components/titleSection';
import React from 'react';
import { Box } from 'zmp-ui';

const SkeletonPostDetailPage = () => {
  return (
    <Box>
      {/* Image skeleton */}
      <Box mb={2}>
        <Skeleton.Image className="!w-full" style={{ width: '100%', height: 280 }} active />
      </Box>

      <Box p={4}>
        {/* Title + action button */}
        <Box mb={3} flex alignItems="flex-end" justifyContent="space-between" className="gap-2">
          <Skeleton.Input style={{ width: 200 }} active size="large" />
          <Skeleton.Button shape="circle" active size="small" />
        </Box>

        {/* Description */}
        <Box mb={9}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Box>

        {/* Map */}
        <Box p={0} mb={4}>
          <Skeleton.Image style={{ width: '100%', height: 200 }} active />
        </Box>

        {/* Rating */}
        <Box mb={4}>
          <Skeleton.Input style={{ width: 120 }} active />
        </Box>

        {/* Related Posts */}
        <Box pb={4}>
          <TitleSection title="Bài viết liên quan" mB={2} />
          <Box pt={4}>
            <div className="grid grid-cols-1 gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton.Input key={i} style={{ width: '100%', height: 100 }} active />
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonPostDetailPage;
