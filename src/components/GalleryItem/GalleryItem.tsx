import { Icon } from '@iconify/react';
import { AlbumItem } from 'apiRequest/album/types';
import React from 'react';
import { formatImageSrc } from 'utils';
import { Box, useNavigate } from 'zmp-ui';

type GalleryItemType = {
  data: AlbumItem;
  onClick?: () => void;
};
const GalleryItem: React.FC<GalleryItemType> = ({ data, onClick }) => {
  const navigate = useNavigate();

  return (
    <Box className="relative w-full h-[240px] rounded-lg overflow-hidden" onClick={onClick}>
      <img className="h-full w-full object-cover" src={formatImageSrc(data.image)} alt="destination" />
      <div className="absolute w-full bottom-0 left-0 p-4 bg-[#365140e6]">
        <h3 className="text-[18px] leading-[24px] font-semibold text-[#fff] flex items-center gap-2">
          <span>
            <Icon fontSize={22} icon={'nrk:gallery'} />
          </span>
          <span className="line-clamp-1">{data.name}</span>
        </h3>
      </div>
    </Box>
  );
};

export default GalleryItem;
