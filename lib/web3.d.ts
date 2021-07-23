import Web3 from 'web3';
import { Options } from './common';
export declare function getAddressBalances(provider: Web3, address: string, tokens: string[], options?: Options): Promise<import("./common").BalanceMap>;
export declare function getAddressesBalances(provider: Web3, addresses: string[], tokens: string[], options?: Options): Promise<import("./common").AddressBalanceMap>;
