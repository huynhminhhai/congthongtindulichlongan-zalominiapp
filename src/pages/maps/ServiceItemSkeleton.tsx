import { Skeleton } from 'antd';
import React from 'react';

import styles from './Maps.module.scss';

const ServiceItemSkeleton: React.FC = () => {
  return (
    <div className={styles.serviceItem}>
      <Skeleton.Image style={{ width: 115, height: 130 }} active />
      <div className={styles.serviceDetail}>
        <Skeleton.Input style={{ width: 160, marginBottom: 8 }} active size="small" />
        <div className={styles.serviceRate}>
          <Skeleton.Input style={{ width: 40 }} active size="small" />
        </div>
      </div>
    </div>
  );
};

export default ServiceItemSkeleton;
