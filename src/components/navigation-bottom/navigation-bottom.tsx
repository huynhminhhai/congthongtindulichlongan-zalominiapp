import { Icon } from '@iconify/react'
import React, { FC, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { BottomNavigation } from 'zmp-ui'
import { MenuItem } from 'constants/types'
import { useStoreApp } from 'store/store'
import { useRole } from 'store/authSlice'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
const Navigation: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { account } = useStoreApp()
  const role = useRole()
  const { t } = useTranslation('common')

  const tabs: Record<string, MenuItem> = {
    '/': {
      label: t('home'),
      icon: <Icon icon="mynaui:home" />,
      activeIcon: <Icon icon="mynaui:home" />,
    },
    '/maps': {
      label: 'Bản đồ',
      icon: <Icon icon="solar:map-linear" />,
      activeIcon: <Icon icon="solar:map-linear" />,
    },
    '/favorite': {
      label: t('favorites'),
      icon: <Icon icon="material-symbols:favorite-outline" />,
      activeIcon: <Icon icon="material-symbols:favorite-outline" />,
    },
    '/account': {
      label: t('account'),
      icon: <Icon icon="mdi:account-outline" />,
      activeIcon: <Icon icon="mdi:account-outline" />,
    },
    // '/settings': {
    //   label: t('settings'),
    //   icon: <Icon icon="line-md:cog-filled" />,
    //   activeIcon: <Icon icon="line-md:cog-filled" />,
    // },
  }

  type TabKeys = keyof typeof tabs

  const HAS_BOTTOM_NAVIGATION_PAGES = [
    '/',
    '/management',
    '/account',
    '/favorite',
    '/settings',
    '/maps',
  ]

  const filteredTabs = useMemo(() => {
    if (role === 'admin') {
      return tabs
    }

    const { '/management': _, ...restTabs } = tabs
    return restTabs
  }, [account, t])

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname)
  }, [location, t])

  if (!hasBottomNav) {
    return <></>
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={location.pathname}
      className={styles.bottomNavigation}
    >
      {Object.keys(filteredTabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={filteredTabs[path].label}
          icon={filteredTabs[path].icon}
          activeIcon={filteredTabs[path].activeIcon}
          onClick={() => navigate(path)}
        />
      ))}
    </BottomNavigation>
  )
}
export default Navigation
