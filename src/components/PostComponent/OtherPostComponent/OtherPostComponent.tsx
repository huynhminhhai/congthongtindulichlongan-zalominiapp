import { Icon } from '@iconify/react';
import { MapType } from 'apiRequest/map/type';
import React from 'react';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';
import { Box } from 'zmp-ui';

import styles from './index.module.scss';

const OtherPostComponent: React.FC<{
  data: MapType;
  onClick: () => void;
}> = ({ data, onClick }) => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Box className={styles.accommodationItem} onClick={onClick}>
      <img className={styles.accommodationImage} src={formatImageSrc(data?.image)} alt={data?.name} />
      <Box className={styles.accommodationContent}>
        <div className={styles.accommodationContentTop}>
          <h3 className={styles.accommodationTitle}>{data?.name}</h3>
        </div>
        <div className={styles.address}>
          <Icon className={styles.addressIcon} icon="weui:location-filled" />
          <span className={styles.addressText}>{data?.address ? data.address : t['MessageUpdate']}</span>
        </div>
      </Box>
    </Box>
  );
};

export default OtherPostComponent;
