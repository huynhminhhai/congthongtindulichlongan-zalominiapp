import { Icon } from '@iconify/react'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'
import styles from './index.module.scss'

interface ILocationItem {
  data: any
  onClick?: () => void
}

const LocationItem: React.FC<ILocationItem> = ({ data, onClick }) => {
  const navigate = useNavigate()

  return (
    <Box
      className={styles.locationItem}
      onClick={() => navigate(`/hotel-detail/?id=${data?.id}`)}
    >
      <div className={styles.toggleFavorite}>
        {data?.isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div>
      <img
        className={styles.locationImage}
        src={data?.imgUrl}
        alt={data?.title}
      />
      <Box className={styles.locationContent}>
        <div className={styles.locationContentTop}>
          <h3 className={styles.locationTitle}>{data?.title}</h3>
          <div className={styles.locationRate}>
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

export default LocationItem
