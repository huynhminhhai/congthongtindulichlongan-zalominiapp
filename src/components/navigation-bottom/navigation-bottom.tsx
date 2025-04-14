import { Icon } from '@iconify/react';
import { MenuItem } from 'constants/types';
import React, { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useStoreApp } from 'store/store';
import { BottomNavigation } from 'zmp-ui';

import styles from './index.module.scss';

const Navigation: FC = () => {
  const { currentLanguage } = useStoreApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { Home, ZaloFavorites, Map, Account } = currentLanguage.value;
  const tabs: Record<string, MenuItem> = {
    '/': {
      label: Home,
      icon: <Icon icon="material-symbols:home-rounded" />,
      activeIcon: <Icon icon="material-symbols:home-rounded" />,
    },
    '/maps': {
      label: Map,
      icon: <Icon icon="material-symbols:map" />,
      activeIcon: <Icon icon="material-symbols:map" />,
    },
    '/favorite': {
      label: ZaloFavorites,
      icon: <Icon icon="material-symbols:favorite-rounded" />,
      activeIcon: <Icon icon="material-symbols:favorite-rounded" />,
    },
    '/account': {
      label: Account,
      icon: <Icon icon="heroicons:user-16-solid" />,
      activeIcon: <Icon icon="heroicons:user-16-solid" />,
    },
  };

  type TabKeys = keyof typeof tabs;

  const HAS_BOTTOM_NAVIGATION_PAGES = ['/', '/management', '/account', '/favorite', '/settings', '/maps'];

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (!hasBottomNav) {
    return <></>;
  }

  return (
    <BottomNavigation id="footer" activeKey={location.pathname} className={styles.bottomNavigation}>
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => navigate(path)}
        />
      ))}
    </BottomNavigation>
  );
};
export default Navigation;
