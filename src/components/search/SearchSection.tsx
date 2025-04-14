import React from 'react';
import { useStoreApp } from 'store/store';
import { Box, Input, useNavigate } from 'zmp-ui';

const SearchSection = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const navigate = useNavigate();

  return (
    <Box px={4} pb={4}>
      <Input.Search onClick={() => navigate('/search')} placeholder={t['Search']} />
    </Box>
  );
};

export default SearchSection;
