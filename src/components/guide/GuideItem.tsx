import { Icon } from '@iconify/react';
import { PostType } from 'apiRequest/posts/types';
import React from 'react';
import { formatImageSrc } from 'utils';
import { Box, useNavigate } from 'zmp-ui';

type GuideItemType = {
  data: PostType;
  onClick: () => void;
};

const GuideItem: React.FC<GuideItemType> = ({ data, onClick }) => {
  console.log(data);

  const navigate = useNavigate();

  return (
    <Box flex flexDirection="column" alignItems="center" onClick={() => navigate('/guide-detail')}>
      <img
        className="h-[110px] w-[110px] object-cover rounded-full"
        src={formatImageSrc(data.image)}
        alt={data.title}
      />
      <Box px={3} py={4}>
        <h3 className="text-[16px] font-bold text-[#355933] line-clamp-1 mb-2 text-center">{data.title}</h3>
        <ul className="flex flex-col gap-1 text-[14px] leading-[18px] font-medium">
          <li className="flex items-start gap-1">
            <Icon fontSize={18} icon="mdi:place-outline" />
            <span className="flex-1 line-clamp-2">{data.summary}</span>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default GuideItem;
