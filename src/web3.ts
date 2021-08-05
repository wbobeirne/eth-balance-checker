import Web3 from 'web3';
import BN from 'bn.js';
import {
  DEFAULT_CONTRACT_ADDRESS,
  Options,
  formatAddressBalances,
  CONTRACT_ADDRESSES,
} from './common';
// https://github.com/ChainSafe/web3.js/issues/3310#issuecomment-701590114
const BalanceCheckerABI = require('./abis/BalanceChecker.abi.json');

async function getContractAddress(provider: Web3) {
  const chainId = await provider.eth.getChainId();
  if (!(chainId in CONTRACT_ADDRESSES)) return DEFAULT_CONTRACT_ADDRESS;
  return CONTRACT_ADDRESSES[chainId];
}

async function getContract(provider: Web3, address?: string) {
  return new provider.eth.Contract(
    BalanceCheckerABI,
    address || await getContractAddress(provider),
  );
}

export async function getAddressBalances(
  provider: Web3,
  address: string,
  tokens: string[],
  options: Options = {},
) {
  const contract = await getContract(provider, options.contractAddress);
  const balances = await contract.methods.balances([address], tokens).call();
  return formatAddressBalances<BN>(balances, [address], tokens)[address];
}

export async function getAddressesBalances(
  provider: Web3,
  addresses: string[],
  tokens: string[],
  options: Options = {},
) {
  const contract = await getContract(provider, options.contractAddress);
  const balances = await contract.methods.balances(addresses, tokens).call();
  return formatAddressBalances<BN>(balances, addresses, tokens);
}
