export interface Options {
  contractAddress?: string;
}

export type BalanceMap = {
  [tokenAddress: string]: string;
}

export type AddressBalanceMap = {
  [address: string]: BalanceMap;
} 

export const DEFAULT_CONTRACT_ADDRESS = '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39';

export const CONTRACT_ADDRESSES: Record<number, string> = {
  1: DEFAULT_CONTRACT_ADDRESS,
  3: '0x8D9708f3F514206486D7E988533f770a16d074a7',
  4: '0x3183B673f4816C94BeF53958BaF93C671B7F8Cf2',
  42: '0x55ABBa8d669D60A10c104CC493ec5ef389EC92bb',
  56: '0xB12aeC3A7e0B8CFbA307203a33c88a3BBC0D9622',
  97: '0x5E6F706c8Ca87c5FCbdBbfa74d69999dCDa46B24'
}

export function formatAddressBalances<T extends { toString: () => string }>(values: T[], addresses: string[], tokens: string[]) {
  const balances: AddressBalanceMap = {};
  addresses.forEach((addr, addrIdx) => {
    balances[addr] = {};
    tokens.forEach((tokenAddr, tokenIdx) => {
      const balance = values[addrIdx * tokens.length + tokenIdx];
      balances[addr][tokenAddr] = balance.toString();
    });
  });
  return balances;
}