import { Icon } from '@iconify/react'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import styles from './index.module.scss'

interface IAccommodationItem {
  data: any
  onClick?: () => void
}

const AccommodationItem: React.FC<IAccommodationItem> = ({ data, onClick }) => {
  const navigate = useNavigate()

  return (
    <Box
      className={styles.accommodationItem}
      onClick={() => navigate(`/accommodation/${data?.id}`)}
    >
      <div className={styles.toggleFavorite}>
        {data?.isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div>
      <img
        className={styles.accommodationImage}
        src={data?.imgUrl}
        alt={data?.title}
      />
      <Box className={styles.accommodationContent}>
        <div className={styles.accommodationContentTop}>
          <h3 className={styles.accommodationTitle}>{data?.title}</h3>
          <div className={styles.accommodationRate}>
            <p>{data?.rating}</p>
            <Icon className={styles.starIcon} icon="ic:round-star" />
          </div>
        </div>
        <div className={styles.address}>
          <Icon className={styles.addressIcon} icon="weui:location-filled" />
          <span className={styles.addressText}>{data?.address}</span>
        </div>
      </Box>
    </Box>
  )
}

export default AccommodationItem
