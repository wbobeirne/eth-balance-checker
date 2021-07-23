import { providers, Signer } from 'ethers';
import { Options } from './common';
declare type Provider = providers.Provider;
export declare function getAddressBalances(provider: Provider | Signer, address: string, tokens: string[], options?: Options): Promise<import("./common").BalanceMap>;
export declare function getAddressesBalances(provider: Provider | Signer, addresses: string[], tokens: string[], options?: Options): Promise<import("./common").AddressBalanceMap>;
export {};
