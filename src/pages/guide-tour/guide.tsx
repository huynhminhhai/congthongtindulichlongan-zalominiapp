import { Divider } from 'components/divider';
import { HeaderSub } from 'components/header-sub';
import { GuideItem } from 'components/PostComponent/guide';
import FilterBar from 'components/table/FilterBar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Input, Page, Select } from 'zmp-ui';

export const guides = [
  {
    name: 'Nguyễn Văn Nam',
    img: 'https://vcdn1-dulich.vnecdn.net/2019/06/26/DSC1077-1561521306-5685-1561524976.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LwRQwSOWFP6j3s6L3RXusw',
    place: 'Bến Lức, Long An',
  },
  {
    name: 'Trần Quang Huy',
    img: 'https://trekkingtoursapa.com/wp-content/uploads/2020/05/Hu-Lo.jpg',
    place: 'Bến Lức, Long An',
  },
  {
    name: 'Phạm Thùy Linh',
    img: 'https://cantho-school.fpt.edu.vn/wp-content/uploads/con-gai-co-nen-hoc-quan-tri-du-lich-va-lu-hanh-1.jpg',
    place: 'Bến Lức, Long An',
  },
  {
    name: 'Võ Thanh Trúc',
    img: 'https://media.vov.vn/sites/default/files/styles/large/public/2022-09-2/hdv-nhu-quynh.jpg',
    place: 'Bến Lức, Long An',
  },
  {
    name: 'Hoàng Ngọc Anh',
    img: 'https://media.yeah1.com/resize/868x505/files/phuongthao09vd/2023/12/26/co-gai-co-ten-la-chieu-hoang-6-120848.jpg',
    place: 'Bến Lức, Long An',
  },
  {
    name: 'Lê Minh Khoa',
    img: 'https://kenhnguoinoitieng.com/wp-content/uploads/2024/08/Hinh-1-13-772x1024.jpg',
    place: 'Bến Lức, Long An',
  },
];

const GuidePage = () => {
  const { Option } = Select;
  const { t: tCommon } = useTranslation('common');

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={tCommon('tour-guide')} />
        <Box pb={4}>
          <Box>
            <FilterBar
              showAddButton={false}
              searchComponent={<Input.Search placeholder={tCommon('searching')} value={''} />}
            >
              <div className="col-span-12">
                <Select placeholder="Chọn khu vực" closeOnSelect>
                  <Option title={'Tất cả'} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
            </FilterBar>
          </Box>
          <Box px={4}>
            <div className="grid grid-cols-2 gap-3">
              {guides.map((item, index) => (
                <Box mb={6} key={index}>
                  <GuideItem data={item} />
                </Box>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default GuidePage;
