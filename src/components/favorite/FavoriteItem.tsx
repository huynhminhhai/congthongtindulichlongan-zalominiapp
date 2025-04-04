import { Icon } from '@iconify/react'
import React from 'react'
import { Box } from 'zmp-ui'
import styles from './index.module.scss'
interface IFavoriteItem {
  image: string
  title: string
  category: string
  isFavorite?: boolean
  onCancel?: () => void
}
const FavoriteItem: React.FC<IFavoriteItem> = ({
  image,
  title,
  category,
  isFavorite = false,
  onCancel,
}) => {
  return (
    <Box className={styles.favoriteItem}>
      <div className={styles.toggleFavorite}>
        {isFavorite ? (
          <Icon icon="line-md:heart-filled" className={styles.active} />
        ) : (
          <Icon icon="mdi-light:heart" />
        )}
      </div>
      <img
        className="w-full h-[210px] object-cover rounded-lg"
        src={image}
        alt={title}
      />
      <Box px={3} py={4}>
        <h3 className="text-[18px] font-bold text-[#355933] line-clamp-2 mb-2">
          {title}
        </h3>
        <ul className="flex flex-col gap-1 text-[14px] leading-[18px] font-medium">
          <li className="flex items-center gap-1">
            <Icon fontSize={18} icon="codicon:tag" />
            {category}
          </li>
        </ul>
        {/* <div className="actions flex items-center justify-end" onClick={() => console.log('remove form favorite list')}>
                    <button className="btn-bookmark active"><img className='w-[30px]' src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png" alt="mục yêu thích" /></button>
                </div> */}
      </Box>
    </Box>
  )
}

export default FavoriteItem
