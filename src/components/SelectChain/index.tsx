import React, { useCallback, useEffect, useMemo, useState } from 'react';
import WebSelectChain from './WebSelectChain';
import MobileSelectChain from './MobileSelectChain';
import { CHAIN_LIST, CHAIN_LIST_SIDE_CHAIN } from 'constants/index';
import { useCommonState } from 'store/Provider/hooks';
import { setCurrentChainItem } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { CommonSelectChainProps, SelectChainProps } from './types';
import SynchronizingChainModal from 'pageComponents/Modal/SynchronizingChainModal';
import { useAccounts } from 'hooks/portkeyWallet';
import { useDeposit } from 'hooks/deposit';
import { SideMenuKey } from 'constants/home';

export default function SelectChain({ title, clickCallback }: SelectChainProps) {
  const { activeMenuKey, isMobilePX, currentChainItem } = useCommonState();
  const { currentSymbol } = useDeposit();
  const accounts = useAccounts();
  const [openSynchronizingModal, setOpenSynchronizingModal] = useState(false);

  const closeSynchronizingModal = useCallback(() => {
    setOpenSynchronizingModal(false);
  }, []);

  useEffect(() => {
    // Default: first one
    // The first one is empty, show the second one
    if (!accounts?.[CHAIN_LIST[0].key]?.[0]) {
      store.dispatch(setCurrentChainItem(CHAIN_LIST[1]));
    }
    if (accounts?.[CHAIN_LIST[0].key]?.[0] && !currentChainItem) {
      store.dispatch(setCurrentChainItem(CHAIN_LIST[0]));
    }

    if (activeMenuKey === SideMenuKey.Deposit && currentSymbol?.includes('SGR')) {
      store.dispatch(setCurrentChainItem(CHAIN_LIST_SIDE_CHAIN[0]));
    }
  }, [accounts, activeMenuKey, currentChainItem, currentSymbol]);

  const dropdownProps: CommonSelectChainProps = useMemo(() => {
    return {
      menuItems:
        activeMenuKey === SideMenuKey.Deposit && currentSymbol?.includes('SGR')
          ? CHAIN_LIST_SIDE_CHAIN
          : CHAIN_LIST,
      selectedItem: currentChainItem,
      onClick: async (item) => {
        if (accounts?.[item.key]?.[0]) {
          store.dispatch(setCurrentChainItem(item));
          clickCallback(item);
        } else {
          setOpenSynchronizingModal(true);
        }
      },
    };
  }, [accounts, activeMenuKey, clickCallback, currentChainItem, currentSymbol]);

  return (
    <>
      {isMobilePX ? (
        <MobileSelectChain {...dropdownProps} title={title} />
      ) : (
        <WebSelectChain {...dropdownProps} />
      )}
      <SynchronizingChainModal
        open={openSynchronizingModal}
        onOk={closeSynchronizingModal}
        onCancel={closeSynchronizingModal}
      />
    </>
  );
}
