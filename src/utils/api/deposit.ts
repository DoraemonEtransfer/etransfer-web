import axios from 'axios';
import { handleErrorMessage } from '@portkey/did-ui-react';
import { request } from 'api';
import { CancelTokenSourceKey, CommonErrorNameType } from 'api/types';
import { ErrorNameType, FAIL_MODAL_REASON_ERROR_CODE_LIST } from 'constants/withdraw';
import {
  CreateWithdrawOrderRequest,
  CreateWithdrawOrderResult,
  GetDepositInfoRequest,
  GetDepositInfoResult,
  GetNetworkListRequest,
  GetNetworkListResult,
  GetTokenListRequest,
  GetTokenListResult,
  GetWithdrawInfoRequest,
  GetWithdrawInfoResult,
} from 'types/api';

export const getTokenList = async (params: GetTokenListRequest): Promise<GetTokenListResult> => {
  try {
    const res = await request.deposit.getTokenList({ params });
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getTokenList error'));
  }
};

export const getNetworkList = async (
  params: GetNetworkListRequest,
): Promise<GetNetworkListResult> => {
  try {
    const res = await request.deposit.getNetworkList({
      params,
      cancelTokenSourceKey: CancelTokenSourceKey.GET_NETWORK_LIST,
    });
    return res.data;
  } catch (error) {
    const newError = new Error(handleErrorMessage(error, 'getNetworkList error'));
    if (axios.isCancel(error)) {
      newError.name = CommonErrorNameType.CANCEL;
    }
    throw newError;
  }
};

export const getDepositInfo = async (
  params: GetDepositInfoRequest,
): Promise<GetDepositInfoResult> => {
  try {
    const res = await request.deposit.getDepositInfo({
      params,
      cancelTokenSourceKey: CancelTokenSourceKey.GET_DEPOSIT_INFO,
    });
    return res.data;
  } catch (error) {
    const newError = new Error(handleErrorMessage(error, 'getDepositInfo error'));
    if (axios.isCancel(error)) {
      newError.name = CommonErrorNameType.CANCEL;
    }
    throw newError;
  }
};

export const getWithdrawInfo = async (
  params: GetWithdrawInfoRequest,
): Promise<GetWithdrawInfoResult> => {
  try {
    const res = await request.deposit.getWithdrawInfo({
      params,
      cancelTokenSourceKey: CancelTokenSourceKey.GET_WITHDRAW_INFO,
    });
    return res.data;
  } catch (error) {
    const newError = new Error(handleErrorMessage(error, 'getWithdrawInfo error'));
    if (axios.isCancel(error)) {
      newError.name = CommonErrorNameType.CANCEL;
    }
    throw newError;
  }
};

export const createWithdrawOrder = async (
  params: CreateWithdrawOrderRequest,
): Promise<CreateWithdrawOrderResult> => {
  try {
    const res = await request.deposit.createWithdrawOrder({ data: params });
    return res.data;
  } catch (error) {
    const newError = new Error(handleErrorMessage(error, 'createWithdrawOrder error'));
    if (
      FAIL_MODAL_REASON_ERROR_CODE_LIST.includes(
        (error as { code: (typeof FAIL_MODAL_REASON_ERROR_CODE_LIST)[number]; message: string })
          .code,
      )
    ) {
      newError.name = ErrorNameType.FAIL_MODAL_REASON;
    }
    throw newError;
  }
};
