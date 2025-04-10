import { useGetMenu } from 'apiRequest/menu';
import { MenuItemType } from 'apiRequest/menu/types';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'zmp-ui';

import ServiceItem from './ServiceItem';
import ServiceSub from './ServiceSub';

const ServiceSection: React.FC = () => {
  const navigate = useNavigate();
  const [sheetVisible, setSheetVisible] = useState(false);
  const { data } = useGetMenu();
  const serviceItemList: MenuItemType[] | undefined = useMemo(() => {
    if (data) {
      return data[0]?.items?.filter((item: MenuItemType) => item.additionClass !== 'subMenu');
    }
    return undefined;
  }, [data]);

  const otherServiceItem: MenuItemType | undefined = useMemo(() => {
    if (data) {
      return data[0]?.items?.find((item: MenuItemType) => item.additionClass === 'subMenu');
    }
    return undefined;
  }, [data]);
  return (
    <Box p={4} className="bg-white">
      <Box>
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {serviceItemList &&
            serviceItemList.map((item: MenuItemType, index: React.Key) => (
              <ServiceItem key={index} data={item} onClick={() => navigate(item.url)} />
            ))}
          {otherServiceItem && (
            <>
              <ServiceItem
                data={otherServiceItem}
                onClick={() => {
                  setSheetVisible(true);
                }}
              />
              <ServiceSub
                otherServiceItem={otherServiceItem.children}
                sheetVisible={sheetVisible}
                setSheetVisible={setSheetVisible}
              />
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ServiceSection;
