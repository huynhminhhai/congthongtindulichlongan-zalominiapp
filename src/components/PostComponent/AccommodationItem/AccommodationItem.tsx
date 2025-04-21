import { Icon } from '@iconify/react';
import React from 'react';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';
import { PostComponentPropsType } from 'utils/constants';
import { Box } from 'zmp-ui';

import styles from './index.module.scss';

const AccommodationItem: React.FC<PostComponentPropsType> = ({ data, onClick }) => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Box className={styles.accommodationItem} onClick={onClick}>
      <img className={styles.accommodationImage} src={formatImageSrc(data?.image)} alt={data?.title} />
      <Box className={styles.accommodationContent}>
        <div className={styles.accommodationContentTop}>
          <h3 className={styles.accommodationTitle}>{data?.title}</h3>
        </div>
        <div className={styles.address}>
          <Icon className={styles.addressIcon} icon="weui:location-filled" />
          <span className={styles.addressText}>
            {data?.postMaps && data?.postMaps.length > 0 ? data.postMaps[0].address : t['MessageUpdate']}
          </span>
        </div>
      </Box>
    </Box>
  );
};

export default AccommodationItem;
