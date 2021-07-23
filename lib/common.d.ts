export interface Options {
    contractAddress?: string;
}
export declare type BalanceMap = {
    [tokenAddress: string]: string;
};
export declare type AddressBalanceMap = {
    [address: string]: BalanceMap;
};
export declare const DEFAULT_CONTRACT_ADDRESS = "0xb1f8e55c7f64d203c1400b9d8555d050f94adf39";
export declare function formatAddressBalances<T extends {
    toString: () => string;
}>(values: T[], addresses: string[], tokens: string[]): AddressBalanceMap;
