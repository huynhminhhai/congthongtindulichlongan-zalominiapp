import React from 'react';
import { formatDate, formatImageSrc } from 'utils';
import { PostComponentPropsType } from 'utils/constants';
import { Box, useNavigate } from 'zmp-ui';

const NewsItem: React.FC<PostComponentPropsType> = ({ data, onClick }) => {
  if (!data) return <></>;

  return (
    <Box>
      <div onClick={onClick}>
        <img
          className="slide-img h-[200px] w-full object-cover rounded-xl"
          src={formatImageSrc(data.image)}
          alt={data.title}
        />
        <div className="flex items-center justify-between mt-3 mb-2 pb-2 border-b-[1px] border-[#355933]">
          <div className="text-[13px] leading-[1] font-semibold">
            {data?.categoryName ||
              (data.categories && data.categories?.length ? data.categories.map(c => c.name).join(', ') : '')}
          </div>
          <div className="text-[12px] leading-[1] font-medium">{formatDate(data.publishedDate) || ''}</div>
        </div>
        <h3 className="text-[16px] font-semibold whitespace-normal mt-2 line-clamp-2 ">{data.title}</h3>
      </div>
    </Box>
  );
};

export default NewsItem;
