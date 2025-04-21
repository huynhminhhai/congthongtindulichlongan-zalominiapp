import React from 'react';
import { formatImageSrc } from 'utils';
import { PostComponentPropsType } from 'utils/constants';
import { Box, useNavigate } from 'zmp-ui';

const LocationItem: React.FC<PostComponentPropsType> = ({ data, onClick }) => {
  return (
    <Box className="relative w-full h-[200px] rounded-lg overflow-hidden" onClick={onClick}>
      <img className="h-full w-full object-cover" src={formatImageSrc(data.image)} alt="destination" />
      <div className="absolute w-full bottom-0 left-0 p-3 bg-[#365140e6]">
        <h3 className="text-[16px] leading-[24px] font-semibold text-[#fff] line-clamp-1">{data.title}</h3>
      </div>
    </Box>
  );
};

export default LocationItem;
