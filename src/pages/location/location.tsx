import { HeaderSub } from 'components/header-sub';
import { LocationItem } from 'components/location';
import FilterBar from 'components/table/FilterBar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DIA_DIEM_DU_LICH_DATA } from 'utils/data';
import { Box, Input, Page, Select } from 'zmp-ui';

const LocationPage = () => {
  const { Option } = Select;
  const { t: tCommon } = useTranslation('common');

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={tCommon('destinations')} />
        <Box pb={4}>
          <Box>
            <FilterBar
              showAddButton={false}
              searchComponent={<Input.Search placeholder={tCommon('searching')} value={''} />}
            >
              <div className="col-span-12">
                <Select placeholder={tCommon('all')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Xung quanh'} value={1} />
                </Select>
              </div>
              <div className="col-span-6">
                <Select placeholder={tCommon('cost')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Xung quanh'} value={1} />
                </Select>
              </div>
              <div className="col-span-6">
                <Select placeholder={tCommon('location-type')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                  <Option title={'Xung quanh'} value={1} />
                </Select>
              </div>
            </FilterBar>
          </Box>
          <Box px={4}>
            {DIA_DIEM_DU_LICH_DATA.map((item, index) => (
              <Box mb={3} key={index}>
                <LocationItem data={item} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default LocationPage;
