import { TDynamicArrowSize } from 'components/DynamicArrow';
import { IChainNameItem } from 'constants/index';

type TSelectChainCommon = {
  menuItems: IChainNameItem[];
  selectedItem: IChainNameItem;
  className?: string;
  childrenClassName?: string;
  isBorder?: boolean;
  suffixArrowSize?: TDynamicArrowSize;
  hideDownArrow?: boolean;
};

export interface DeviceSelectChainProps extends TSelectChainCommon {
  onClick: (item: IChainNameItem) => Promise<void> | void;
}

export interface SelectChainProps extends TSelectChainCommon {
  title: string;
  clickCallback: (item: IChainNameItem) => void;
}
