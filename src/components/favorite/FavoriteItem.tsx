import { Icon } from '@iconify/react';
import { ActionButton } from 'components/actions';
import React from 'react';
import { formatImageSrc } from 'utils';
import { Box } from 'zmp-ui';

import styles from './index.module.scss';

export type FavoriteItemType = {
  id: number;
  image: string;
  title: string;
  category: string;
  isFavorite?: boolean;
  onCancel?: () => void;
};
const FavoriteItem: React.FC<FavoriteItemType> = ({ id, title, image, category, onCancel }) => {
  return (
    <Box className={styles.favoriteItem}>
      <ActionButton
        className="absolute top-2 right-2"
        icon="mdi:heart"
        altText="Mục yêu thích"
        isChecked={true}
        onClick={onCancel}
      />

      <img className="w-full h-[210px] object-cover rounded-lg" src={formatImageSrc(image)} alt={title} />
      <Box pt={2} pb={3}>
        <h3 className="text-[18px] leading-6 font-bold text-[#355933] line-clamp-2 mb-2">{title}</h3>
        {category && (
          <ul className="flex flex-col gap-1 text-[14px] leading-[18px] font-medium">
            <li className="flex items-center gap-1">
              <Icon fontSize={18} icon="codicon:tag" />
              {category}
            </li>
          </ul>
        )}
      </Box>
    </Box>
  );
};

export default FavoriteItem;
