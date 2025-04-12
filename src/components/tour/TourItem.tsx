import { Icon } from '@iconify/react';
import { PostType } from 'apiRequest/posts/types';
import React from 'react';
import { formatImageSrc } from 'utils';
import { Box, useNavigate } from 'zmp-ui';

import styles from './index.module.scss';

type TourItemType = {
  data: PostType;
  onClick: () => void;
};

const TourItem: React.FC<TourItemType> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box className={styles.tourItem} onClick={() => navigate(`/tour/${data.id}`)}>
      {/* <div className={styles.toggleFavorite}>
        {data?.isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div> */}
      <img src={formatImageSrc(data.image)} alt={data.title} />
      <Box className={styles.content}>
        <h3>{data.title}</h3>
        <ul>
          <li>
            <Icon icon="mdi:place-outline" />
            {data.postMaps.length} địa điểm
          </li>
          <li>
            <Icon icon="material-symbols:date-range-outline" />
            {data.postTypeNames} ngày
          </li>
        </ul>
      </Box>
      <Box className={styles.footer}>
        <div className={styles.price}>{data.summary}</div>
      </Box>
    </Box>
  );
};

export default TourItem;
