import { HeaderSub } from 'components/header-sub';
import { AccommodationItem } from 'components/PostComponent/AccommodationItem';
import FilterBar from 'components/table/FilterBar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HOTEL_DATA } from 'utils/data';
import { Box, Input, Page, Select, useLocation } from 'zmp-ui';

const AccommodationPage = () => {
  const { Option } = Select;
  const { t: tCommon } = useTranslation('common');
  const { state } = useLocation();
  console.log(state.type);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={tCommon('accommodations')} />
        <Box pb={4}>
          <Box>
            <FilterBar
              showAddButton={false}
              searchComponent={<Input.Search placeholder={tCommon('searching')} value={''} />}
            >
              <div className="col-span-12">
                <Select placeholder={tCommon('all')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
              <div className="col-span-6">
                <Select placeholder={tCommon('cost')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
              <div className="col-span-6">
                <Select placeholder={tCommon('accommodation-type')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
            </FilterBar>
          </Box>
          <Box px={4}>
            {HOTEL_DATA.map((item, index) => (
              <Box mb={6} key={index}>
                <AccommodationItem data={item} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default AccommodationPage;
