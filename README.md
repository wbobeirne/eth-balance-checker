<p align="center">
  <img src="https://i.imgur.com/2ZBxjyu.png" width="340" />
</p>

# Ethereum Balance Checker

A contract and library pair that allows you to check formultiple token and ETH
balances across multiple addresses in a single call.

## NPM Package

```
npm install --save eth-balance-checker
# OR
yarn add eth-balance-checker
```

### Contract

The main contract is in `contracts/BalanceChecker.sol`. Its associated ABI is in `abis/BalanceChecker.abi.json`. Both of these are included in the NPM package if you want to compile them yourself, or extend them with another
contract.

### Library

There are separate libraries for [web3.js](https://github.com/ethereum/web3.js/)
and [ethers.js](https://github.com/ethers-io/ethers.js/), both with identical 
APIs. Just import the functions from either `eth-balance-checker/lib/web3` or
`eth-balance-checker/lib/ethers`. For all functions, pass `"0x0"` as the "token"
address to get the ether balance of an address.

#### getAddressBalances

##### Parameters
* `provider: Web3 | Ethers.Provider` - The provider to use for the contract call.
* `address: string` - The address to lookup balances for
* `tokens: string[]` - Array of token contract addresses. Only supports ERC20 tokens.

##### Returns
```js
Promise<{
  // Ether balance
  "0x0": BigNumber,
  // Token balances
  "0x123...": BigNumber,
  "0x456...": BigNumber,
  ...
}>
```

#### getAddressesBalances

##### Parameters
* `provider: Web3 | Ethers.Provider` - The provider to use for the contract call.
* `addresses: string[]` - Array of addresses to lookup balances for.
* `tokens: string[]` - Array of token contract addresses. Only supports ERC20 tokens.

##### Returns
```js
Promise<{
  // Address as the key
  "0x123...": {
    // Ether balance
    "0x0": BigNumber,
    // Token balances
    "0x456...": BigNumber,
    "0x789...": BigNumber,
    ...
  },
  ...
}>
```


## Development

### Setup

Requires node 8+. Just install packages, then use commands as needed:

```
npm install
# OR
yarn
```

### Commands

* `build:contract` - Runs `truffle compile` on the contract, and extracts ABI.
* `build:lib` - Runs `tsc` and outputs js and typedefs to `lib/`
* `build` - Runs `build:contract` then `build:lib`
* `test:contract` - Runs `truffle test`
* `test:lib` - No tests implemented yet
* `test` - Runs `tst:contract` and `test:lib`