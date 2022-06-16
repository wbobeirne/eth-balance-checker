import { BigNumber, Contract, providers, Signer } from 'ethers';
import {
  DEFAULT_CONTRACT_ADDRESS,
  Options,
  formatAddressBalances,
  CONTRACT_ADDRESSES
} from './common';
import BalanceCheckerABI from './abis/BalanceChecker.abi.json';

type Provider = providers.Provider;

async function getContractAddress(providerOrSigner: Provider | Signer) {
  const provider = "provider" in providerOrSigner
    ? providerOrSigner.provider
    : providerOrSigner;
  if (!provider || !("getNetwork" in provider)) return DEFAULT_CONTRACT_ADDRESS;
  const network = await provider.getNetwork();
  if (!network || !network.chainId || !(network.chainId in CONTRACT_ADDRESSES))
    return DEFAULT_CONTRACT_ADDRESS;
  return CONTRACT_ADDRESSES[network.chainId];
}

async function getContract(provider: Provider | Signer, address?: string) {
  return new Contract(
    address || await getContractAddress(provider),
    BalanceCheckerABI,
    provider
  );
}

export async function getAddressBalances(
  provider: Provider | Signer,
  address: string,
  tokens: string[],
  options: Options = {},
) {
  const contract = await getContract(provider, options.contractAddress);
  const balances = await contract.balances([address], tokens);
  return formatAddressBalances<BigNumber>(balances, [address], tokens)[address];
}

export async function getAddressesBalances(
  provider: Provider | Signer,
  addresses: string[],
  tokens: string[],
  options: Options = {},
) {
  const contract = await getContract(provider, options.contractAddress);
  const balances = await contract.balances(addresses, tokens);
  return formatAddressBalances<BigNumber>(balances, addresses, tokens);
}