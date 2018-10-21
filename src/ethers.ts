import { Contract } from 'ethers';
import { Provider } from 'ethers/providers';
import { DEFAULT_CONTRACT_ADDRESS, Options } from './common';
import BalanceCheckerABI from './abis/BalanceChecker.abi.json';

function getContract(provider: Provider, address?: string) {
  return new Contract(
    address || DEFAULT_CONTRACT_ADDRESS,
    BalanceCheckerABI,
    provider
  );
}

export async function getAddressBalances(
  provider: Provider,
  address: string,
  tokens: string[],
  options: Options = {},
) {
  const contract = getContract(provider, options.contractAddress);
  const balances = await contract.balances([address], tokens);
  return balances;
}

export async function getAddressesBalances(
  provider: Provider,
  addresses: string[],
  tokens: string[],
  options: Options = {},
) {
  const contract = getContract(provider, options.contractAddress);
  const balances = await contract.balances(addresses, tokens);
  return balances;
}