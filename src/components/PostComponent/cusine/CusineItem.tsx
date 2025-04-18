import React from 'react';
import { formatImageSrc } from 'utils';
import { PostComponentPropsType } from 'utils/constants';
import { Box, useNavigate } from 'zmp-ui';

const CusineItem: React.FC<PostComponentPropsType> = ({ data, onClick }) => {
  const navigate = useNavigate();

  return (
    <Box onClick={onClick} className="relative">
      <div className="h-[200px] w-full rounded-[8px] overflow-hidden">
        <img className="w-full h-full object-cover" src={formatImageSrc(data.image)} alt={data.title} />
      </div>
      <div className="cusine-category text-[12px] text-[#355933] font-medium mt-3">Đặc sản</div>
      <h3 className="text-[22px] leading-[32px] font-semibold mb-1 line-clamp-1">{data.title}</h3>
      <p className="line-clamp-2 text-[14px] leading-[22px]">{data.summary}</p>
    </Box>
  );
};

export default CusineItem;
