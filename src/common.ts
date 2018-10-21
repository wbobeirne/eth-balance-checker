import BN from 'bn.js';

export interface Options {
  contractAddress?: string;
}

export type BalanceMap = {
  [tokenAddress: string]: BN;
}

export type AddressBalanceMap = {
  [address: string]: BalanceMap;
}

export const DEFAULT_CONTRACT_ADDRESS = '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39';

export function formatAddressBalances(values: BN[], addresses: string[], tokens: string[]) {
  const balances: AddressBalanceMap = {};
  addresses.forEach((addr, addrIdx) => {
    balances[addr] = {};
    tokens.forEach((tokenAddr, tokenIdx) => {
      balances[addr][tokenAddr] = values[addrIdx * tokens.length + tokenIdx];
    });
  });
  return balances;
}