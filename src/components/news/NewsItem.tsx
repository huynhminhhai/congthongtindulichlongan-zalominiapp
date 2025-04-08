import images from 'assets/images';
import { News } from 'constants/utinities';
import React from 'react';
import { Box, Text, useNavigate } from 'zmp-ui';

type NewsItemProps = {
  data: News;
};

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <div onClick={() => navigate(`/news-detail/${data.id}`)}>
        <img
          className="slide-img h-[200px] w-full object-cover rounded-xl"
          src={data.imageUrl || images.thumbnailNews}
          alt={data.title}
        />
        <div className="flex items-center justify-between mt-3 mb-2 pb-2 border-b-[1px] border-[#355933]">
          <div className="text-[13px] leading-[1] font-semibold">{data.category || 'Tin tức'}</div>
          <div className="text-[12px] leading-[1] font-medium">{data.publishedDate || '18/03/2025'}</div>
        </div>
        <h3 className="text-[16px] font-semibold whitespace-normal mt-2 line-clamp-2 ">{data.title}</h3>
      </div>
    </Box>
  );
};

export default NewsItem;
