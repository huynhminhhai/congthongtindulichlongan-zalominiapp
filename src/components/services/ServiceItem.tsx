import { MenuItemType } from 'constants/utinities';
import React from 'react';
import { useLoginWithZalo } from 'services/loginWithZalo';
import { formatImageSrc } from 'utils/formatImageSrc';
import { Box, useNavigate } from 'zmp-ui';

type ServiceItemType = {
  data: MenuItemType;
};

const ServiceItem: React.FC<ServiceItemType> = ({ data }) => {
  const navigate = useNavigate();
  const { loginWithZalo } = useLoginWithZalo();

  const handleNavigate = (url: string) => {
    // if (data.isCheckLogin) {
    //     loginWithZalo(url)
    // } else {
    //     navigate(url)
    // }
  };

  return (
    <Box onClick={() => navigate(data.url)}>
      <div className="flex-center flex-col gap-2">
        <Box>
          <div className="flex-center w-[45px] h-[45px] relative">
            <img src={formatImageSrc(data.image)} alt={data?.text} />
          </div>
        </Box>
        <Box>
          <h4 className="text-[13px] leading-[18px] text-center font-medium">{data.text}</h4>
        </Box>
      </div>
    </Box>
  );
};

export default ServiceItem;
