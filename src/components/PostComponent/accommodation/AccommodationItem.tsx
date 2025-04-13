import { Icon } from '@iconify/react';
import { PostType } from 'apiRequest/posts/types';
import React from 'react';
import { formatImageSrc } from 'utils';
import { Box, useNavigate } from 'zmp-ui';

import styles from './index.module.scss';

interface IAccommodationItem {
  data: PostType;
  onClick?: () => void;
}

const AccommodationItem: React.FC<IAccommodationItem> = ({ data, onClick }) => {
  const navigate = useNavigate();

  return (
    <Box className={styles.accommodationItem} onClick={() => navigate(`/accommodation/${data?.id}`)}>
      {/* <div className={styles.toggleFavorite}>
        {data?.isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div> */}
      <img className={styles.accommodationImage} src={formatImageSrc(data?.image)} alt={data?.title} />
      <Box className={styles.accommodationContent}>
        <div className={styles.accommodationContentTop}>
          <h3 className={styles.accommodationTitle}>{data?.title}</h3>
          {/* <div className={styles.accommodationRate}>
            <p>{data?.rating}</p>
            <Icon className={styles.starIcon} icon="ic:round-star" />
          </div> */}
        </div>
        <div className={styles.address}>
          <Icon className={styles.addressIcon} icon="weui:location-filled" />
          <span className={styles.addressText}>{data?.postMaps.length > 0 && data.postMaps[0].address}</span>
        </div>
      </Box>
    </Box>
  );
};

export default AccommodationItem;
