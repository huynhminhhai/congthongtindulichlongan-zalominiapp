import React from 'react'
import styles from './Maps.module.scss'
import { Icon } from '@iconify/react'
interface ICategoryItem {
  icon: string
  title: string
  active: boolean
  onClick: () => void
}
const CategoryItem: React.FC<ICategoryItem> = ({
  icon,
  title,
  active,
  onClick,
}) => {
  return (
    <div
      className={`${styles.categoryItem} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <Icon fontSize={16} icon={icon} />
      <p>{title}</p>
    </div>
  )
}

export default CategoryItem
