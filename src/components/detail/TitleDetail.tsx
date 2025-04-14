import React from 'react';

const TitleDetail: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className="text-[24px] leading-[32px] font-bold text-[#355933]">{title}</h1>;
};

export default TitleDetail;
