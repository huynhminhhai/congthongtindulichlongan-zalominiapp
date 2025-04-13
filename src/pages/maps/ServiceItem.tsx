import { Icon } from '@iconify/react';
import { Rate } from 'antd';
import React from 'react';
import { formatImageSrc } from 'utils';

import styles from './Maps.module.scss';

interface IServiceItem {
  image: string;
  name: string;
  address: string;
  rating: number;
  totolVote: number;
  onClick: () => void;
}
const ServiceItem: React.FC<IServiceItem> = ({ image, name, address, rating, totolVote, onClick }) => {
  return (
    <div className={styles.serviceItem} onClick={onClick}>
      <img className={styles.serviceImage} src={formatImageSrc(image)} alt={name} />
      <div className={styles.serviceDetail}>
        <div className={styles.serviceName}>{name}</div>
        <div className={styles.serviceRate}>
          <p className={styles.ratingPoint}>{rating}</p>
          <Icon className={styles.starIcon} icon="ic:round-star" />
          <p className={styles.totalVotes}>
            ({totolVote}
            {' đánh giá'})
          </p>
        </div>
        <div className={styles.serviceAddress}>{address}</div>
      </div>
    </div>
  );
};

export default ServiceItem;
