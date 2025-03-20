import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";
import { useRole } from "store/authSlice";
import { useTranslation } from "react-i18next";

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useStoreApp();
  const role = useRole();
  const { t } = useTranslation("common");

  const tabs: Record<string, MenuItem> = {
    "/": {
      label: t("home"),
      icon: <Icon icon="line-md:home-simple-filled" />,
      activeIcon: <Icon icon="line-md:home-simple-filled" />
    },
    "/favorite": {
      label: t("favorites"),
      icon: <Icon icon="line-md:heart-filled" />,
      activeIcon: <Icon icon="line-md:heart-filled" />
    },
    "/account": {
      label: t("account"),
      icon: <Icon icon="line-md:person-filled" />,
      activeIcon: <Icon icon="line-md:person-filled" />
    },
    "/settings": {
      label: t("settings"),
      icon: <Icon icon="line-md:cog-filled" />,
      activeIcon: <Icon icon="line-md:cog-filled" />
    },
  };

  type TabKeys = keyof typeof tabs;

  const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management", "/account", "/favorite", "/settings"];

  const filteredTabs = useMemo(() => {
    if (role === "admin") {
      return tabs;
    }

    const { "/management": _, ...restTabs } = tabs;
    return restTabs;
  }, [account]);

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (!hasBottomNav) {
    return <></>;
  }

  return (
    <>
      <BottomNavigation
        id="footer"
        activeKey={location.pathname}
        className="z-10 box-shadow-3"
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
      </BottomNavigation >
    </>
  );
};