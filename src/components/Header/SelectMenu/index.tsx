import React, { useState } from 'react';
import clsx from 'clsx';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import CommonDrawer from 'components/CommonDrawer';
import { MENU_ITEMS, SideMenuKey } from 'constants/home';
import { useCommonState } from 'store/Provider/hooks';
import styles from './styles.module.scss';
import SupportEntry from 'components/Sider/SupportEntry';
import myEvents from 'utils/myEvent';
import { useChangeSideMenu } from 'hooks/route';

export default function SelectMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { activeMenuKey, isUnreadHistory } = useCommonState();
  const changeSideMenu = useChangeSideMenu();

  return (
    <>
      <div
        className={clsx('flex-none', 'flex-row-center', styles['header-icon-wrapper'])}
        onClick={() => {
          setIsDrawerOpen(true);
        }}>
        <MenuOutlined className={styles['header-icon']} rev={undefined} />
      </div>
      <CommonDrawer
        zIndex={301}
        className={clsx(styles['menu-drawer'], styles['menu-drawer-weight'])}
        height="100%"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        <div className={clsx('flex-column-between', styles['menu-drawer-body'])}>
          <div>
            {MENU_ITEMS.map((item) => {
              const MenuIcon = item.icon;
              return (
                <div
                  key={item.key}
                  className={clsx('flex-row-center', styles['menu-item'], {
                    [styles['menu-item-active']]: item.key === activeMenuKey,
                  })}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    if (item.key === SideMenuKey.History && isUnreadHistory) {
                      myEvents.HistoryActive.emit();
                    }
                    changeSideMenu(item.key);
                  }}>
                  <MenuIcon className={styles['menu-item-icon']} />
                  <div className={styles['menu-item-label']}>
                    {item.label}
                    {isUnreadHistory && item.key === SideMenuKey.History && (
                      <span className={styles['menu-item-red-dot']} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <SupportEntry className={styles.supportEntry} />
        </div>
      </CommonDrawer>
    </>
  );
}
