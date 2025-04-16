import React from 'react';
import { formatImageSrc } from 'utils';
import { Box } from 'zmp-ui';

interface ItemDetailCardProps {
  imgUrl: string;
  title: string;
  desc?: string;
  onClick?: () => void;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = ({ imgUrl, title, desc, onClick }) => {
  return (
    <Box flex className="gap-3" onClick={onClick}>
      <Box>
        <img className="w-[120px] h-[80px] object-cover rounded-lg" src={formatImageSrc(imgUrl)} alt={title} />
      </Box>
      <Box className="flex-1">
        <div className="text-[16px] leading-[18px] font-semibold mb-1 line-clamp-2">{title}</div>
        <div className="text-[12px] leading-[16px] font-medium line-clamp-2">{desc}</div>
      </Box>
    </Box>
  );
};

export default ItemDetailCard;
