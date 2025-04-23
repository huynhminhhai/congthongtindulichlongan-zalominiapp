import { VideoType } from 'apiRequest/videos/types';
import React from 'react';
import ReactPlayer from 'react-player';
import { formatImageSrc } from 'utils';
import { Box, useNavigate } from 'zmp-ui';

type VideoItemType = {
  data: VideoType;
  onClick?: () => void;
};
const VideoItem: React.FC<VideoItemType> = ({ data, onClick }) => {
  const keywords = ['youtube', 'youtu.be'];
  const isYoutube = keywords.some(keyword => data.url.includes(keyword));
  const src = isYoutube ? data.url : formatImageSrc(data.url);
  return (
    <Box className="relative w-full  rounded-lg overflow-hidden" onClick={onClick}>
      <ReactPlayer controls className=" w-full rounded-lg overflow-hidden" height={'240px'} width={'100%'} url={src} />
      <h3 className="text-[18px] leading-[24px] mt-2 font-semibold text-[#365140e6] flex items-center gap-2 line-clamp-2">
        {data.title}
      </h3>
    </Box>
  );
};

export default VideoItem;
