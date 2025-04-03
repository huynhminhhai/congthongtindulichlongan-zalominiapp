import React from 'react'
import styles from './Maps.module.scss'
import { Rate } from 'antd'
interface IServiceItem {
  image: string
  name: string
  address: string
  rating: number
  onClick: () => void
}
const ServiceItem: React.FC<IServiceItem> = ({
  image,
  name,
  address,
  rating,
  onClick,
}) => {
  return (
    <div className={styles.serviceItem} onClick={onClick}>
      <img className={styles.serviceImage} src={image} alt={name} />
      <div className={styles.serviceDetail}>
        <div className={styles.serviceName}>{name}</div>
        <Rate
          disabled
          value={rating}
          allowHalf
          className={styles.serviceRating}
        />
        <div className={styles.serviceAddress}>{address}</div>
      </div>
    </div>
  )
}

export default ServiceItem
