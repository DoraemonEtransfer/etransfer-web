import styles from './styles.module.scss';
import clsx from 'clsx';
import {
  Aelf,
  Ethereum,
  Polygon,
  Arbitrum,
  Optimism,
  Solana,
  Tron,
  Binance,
  Avax,
} from 'assets/images';
import { useCallback } from 'react';
import { BlockchainNetworkType, ExploreUrlType } from 'constants/network';
import { SupportedChainId, defaultNullValue } from 'constants/index';
import Copy, { CopySize } from 'components/Copy';
import { getOmittedStr } from 'utils/calculate';
import { openWithBlank, getExploreLink, getOtherExploreLink, addressFormat } from 'utils/common';
import { SupportedELFChainId } from 'constants/index';
import CommonTooltip from 'components/CommonTooltip';
import { useCommonState } from 'store/Provider/hooks';
import { useAccounts } from 'hooks/portkeyWallet';

type TAddressBoxProps = {
  type: 'To' | 'From';
  fromAddress: string;
  toAddress: string;
  network: string;
  fromChainId: SupportedELFChainId;
  toChainId: SupportedELFChainId;
  fromToAddress: string;
  toFromAddress: string;
};

export default function AddressBox({
  type,
  fromAddress,
  toAddress,
  network,
  fromChainId,
  toChainId,
}: TAddressBoxProps) {
  const { isMobilePX } = useCommonState();
  const accounts = useAccounts();

  const addressIcon = useCallback(() => {
    switch (network) {
      case BlockchainNetworkType.AELF:
        return <Aelf />;
      case BlockchainNetworkType.Ethereum:
        return <Ethereum />;
      case BlockchainNetworkType.Polygon:
        return <Polygon />;
      case BlockchainNetworkType.Arbitrum:
        return <Arbitrum />;
      case BlockchainNetworkType.Optimism:
        return <Optimism />;
      case BlockchainNetworkType.Solana:
        return <Solana />;
      case BlockchainNetworkType.Tron:
        return <Tron />;
      case BlockchainNetworkType.Binance:
        return <Binance />;
      case BlockchainNetworkType.Avax:
        return <Avax />;
      default:
        // when not match network's type, display first character and uppercase
        return <div className={clsx(styles['network'])}>{network?.charAt(0).toUpperCase()}</div>;
    }
  }, [network]);

  const calcAddress = useCallback(() => {
    const address = type === 'To' ? toAddress : fromAddress;
    if (address && network === BlockchainNetworkType.AELF) {
      // format address: add suffix
      const chainId: SupportedELFChainId = type === 'To' ? toChainId : fromChainId;
      return addressFormat(address, chainId || SupportedChainId.sideChain);
    }
    if (!address && network === BlockchainNetworkType.AELF) {
      // when fromAddress and toAddress all null, need accounts default address
      let chainId: SupportedELFChainId = type === 'To' ? toChainId : fromChainId;
      chainId = chainId || SupportedChainId.sideChain;
      if (accounts && accounts[chainId] && accounts[chainId]?.[0]) {
        // default accounts[chainId]?.[0] , if not exist, use AELF
        return (
          accounts[chainId]?.[0] || accounts[SupportedELFChainId.AELF]?.[0] || defaultNullValue
        );
      }
      return defaultNullValue;
    }
    return address || defaultNullValue;
  }, [type, network, accounts, toChainId, fromChainId, fromAddress, toAddress]);

  const handleAddressClick = useCallback(() => {
    // link to Deposit: toTransfer.chainId and Withdraw: fromTransfer.chainId
    if (network === BlockchainNetworkType.AELF) {
      openWithBlank(
        getExploreLink(calcAddress(), 'address', type === 'To' ? toChainId : fromChainId),
      );
      return;
    }
    openWithBlank(
      getOtherExploreLink(calcAddress(), network as keyof typeof ExploreUrlType, 'address'),
    );
  }, [network, calcAddress, type, toChainId, fromChainId]);

  return (
    <div
      className={clsx(
        styles['address-box'],
        isMobilePX ? styles['mobile-address-box'] : styles['web-address-box'],
      )}>
      {addressIcon()}
      <CommonTooltip title={calcAddress()} trigger={'hover'}>
        <span className={clsx(styles['address-word'])} onClick={handleAddressClick}>
          {getOmittedStr(calcAddress(), 8, 9)}
        </span>
      </CommonTooltip>
      <Copy toCopy={calcAddress()} size={CopySize.Small} />
    </div>
  );
}
