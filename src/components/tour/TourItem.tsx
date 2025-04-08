import { Icon } from '@iconify/react';
import React from 'react';
import { Box, useNavigate } from 'zmp-ui';

import styles from './index.module.scss';

const TourItem: React.FC<any> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box className={styles.tourItem} onClick={() => navigate(`/tour/${data.id}`)}>
      <div className={styles.toggleFavorite}>
        {data?.isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div>
      <img src={data.imgUrl} alt={data.title} />
      <Box className={styles.content}>
        <h3>{data.title}</h3>
        <ul>
          <li>
            <Icon icon="mdi:place-outline" />
            {data.place} địa điểm
          </li>
          <li>
            <Icon icon="material-symbols:date-range-outline" />
            {data.date} ngày
          </li>
        </ul>
      </Box>
      <Box className={styles.footer}>
        <div className={styles.price}>{data.price}</div>
      </Box>
    </Box>
  );
};

export default TourItem;
