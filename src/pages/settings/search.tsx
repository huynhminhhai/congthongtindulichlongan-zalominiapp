import { ItemDetailCard } from 'components/detail';
import { HeaderSub } from 'components/header-sub';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreApp } from 'store/store';
import { Box, Input, Page, Select } from 'zmp-ui';

const { Option } = Select;

const SearchPage: React.FC = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px]">
      <Box>
        <HeaderSub title={t['QuickSearch']} />
        <Box p={4}>
          <Box mb={2}>
            <Input.Search
              className="h-[46px] !border-0"
              focused
              placeholder={t['Search']}
              onSearch={text => console.log(text)}
            />
          </Box>
          <Box>
            <Select placeholder={t['SelectAllSearch']} defaultValue={'all'} className="h-[46px] !border-0">
              <Option value="all" title={t['SelectAllSearch']} />
              <Option value="2" title="Option 2" />
              <Option value="3" title="Option 3" />
            </Select>
          </Box>

          <div className="text-[16px] leading-[1] font-semibold my-3">{t['Result']} (2)</div>
          <Box flex flexDirection="column" className="gap-3">
            <ItemDetailCard
              title="Nhà trăm cột"
              imgUrl="https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg"
              desc="Địa điểm nổi bật"
            />
            <ItemDetailCard
              title="Tuần Văn hóa - Thể thao - Du lịch tỉnh Long An lần thứ 2 năm 2024 - Thành công tốt đẹp"
              imgUrl="https://www.baolongan.vn/image/news/2024/20241205/images/khai%20m%E1%BA%A1c%20(38).jpg"
              desc="Sự kiện"
            />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default SearchPage;
