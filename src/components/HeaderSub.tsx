import React from 'react';
import { Box, Header } from 'zmp-ui';

type HeaderSubProps = {
  title: string;
  onBackClick?: () => void;
};

export const HeaderSub: React.FC<HeaderSubProps> = ({ title, onBackClick }) => {
  return (
    <Header
      className="sub"
      {...(onBackClick ? { onBackClick } : {})}
      title={
        (
          <Box flex alignItems="center">
            <h4 className="text-[18px] font-semibold mr-6 capitalize">{title}</h4>
          </Box>
        ) as unknown as string
      }
    />
  );
};
