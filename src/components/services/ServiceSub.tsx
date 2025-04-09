import { MenuItemType } from 'apiRequest/menu/types';
import images from 'assets/images';
import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Box, Sheet } from 'zmp-ui';

import ServiceItem from './ServiceItem';

type ServiceSubProps = {
  sheetVisible: boolean;
  setSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  otherServiceItem?: MenuItemType[];
};

const ServiceSub: React.FC<ServiceSubProps> = ({ sheetVisible, setSheetVisible, otherServiceItem }) => {
  return createPortal(
    <Sheet visible={sheetVisible} onClose={() => setSheetVisible(false)} autoHeight zIndex={1000} swipeToClose>
      <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {otherServiceItem &&
            otherServiceItem.map((item: MenuItemType, index: React.Key) => <ServiceItem key={index} data={item} />)}
        </div>
      </Box>
    </Sheet>,
    document.body
  );
};

export default ServiceSub;
