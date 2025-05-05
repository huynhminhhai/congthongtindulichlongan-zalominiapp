import { Icon } from '@iconify/react';
import React from 'react';
import { formatImageSrc } from 'utils';

import styles from './Maps.module.scss';

interface ICategoryItem {
  icon: string;
  title: string;
  active: boolean;
  onClick: () => void;
}
const CategoryItem: React.FC<ICategoryItem> = ({ icon, title, active, onClick }) => {
  return (
    <div className={`${styles.categoryItem} ${active ? styles.active : ''}`} onClick={onClick}>
      <Icon icon={icon} fontSize={16} />
      {/* <img alt={title} className="w-[16px] h-[16px]" src={formatImageSrc(icon)} /> */}
      <p>{title}</p>
    </div>
  );
};

export default CategoryItem;
