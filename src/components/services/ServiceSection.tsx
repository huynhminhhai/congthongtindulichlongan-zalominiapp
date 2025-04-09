import { Icon } from '@iconify/react';
import { useGetLanguages } from 'apiRequest/languages';
import { useGetMenu } from 'apiRequest/menu';
import { MenuItemType } from 'apiRequest/menu/types';
import images from 'assets/images';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'zmp-ui';

import ServiceItem from './ServiceItem';
import ServiceSub from './ServiceSub';

const ServiceSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [sheetVisible, setSheetVisible] = useState(false);
  const { data: languageList } = useGetLanguages();
  const { data } = useGetMenu();
  const serviceItemList = useMemo(() => {
    if (data) {
      return data[0]?.items?.filter((item: MenuItemType) => item.additionClass !== 'showMoreMenu');
    }
    return [];
  }, [data]);

  const otherServiceItem = useMemo(() => {
    if (data) {
      return data[0]?.items?.find((item: MenuItemType) => item.additionClass === 'showMoreMenu')?.children;
    }
    return [];
  }, [data]);

  return (
    <Box p={4} className="bg-white">
      <ServiceSub otherServiceItem={otherServiceItem} sheetVisible={sheetVisible} setSheetVisible={setSheetVisible} />
      <Box>
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {serviceItemList &&
            serviceItemList.map((item: MenuItemType, index: React.Key) => <ServiceItem key={index} data={item} />)}
          <div
            className="flex items-center flex-col gap-2"
            onClick={() => {
              setSheetVisible(true);
            }}
          >
            <Box>
              <Icon fontSize={45} icon="line-md:grid-3" />
            </Box>

            <h4 className="text-[13px] leading-[18px] text-center font-medium">{t('utilities')}</h4>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ServiceSection;
