<p align="center">
  <img src="https://i.imgur.com/2ZBxjyu.png" width="340" />
  <h1>Ethereum Balance Checker</h1>
</p>

A smart contract and library pair that allows you to check for multiple ERC20
and Ether balances across multiple addresses in a single RPC call.

## Demo

You can find a demo over here: https://wbobeirne.github.io/eth-balance-checker-demo

The source for that demo is available here: https://github.com/wbobeirne/eth-balance-checker-demo

## NPM Package

```
npm install --save eth-balance-checker
# OR
yarn add eth-balance-checker
```

### Contract

The main contract is in `contracts/BalanceChecker.sol`. Its associated ABI is in `abis/BalanceChecker.abi.json`. Both of these are included in the NPM package if you want to compile them yourself, or extend them with another
contract.

#### Deployed Addresses

- mainnet: `0xb1f8e55c7f64d203c1400b9d8555d050f94adf39`
- ropsten: `0x8D9708f3F514206486D7E988533f770a16d074a7`
- rinkeby: `0x3183B673f4816C94BeF53958BaF93C671B7F8Cf2`
- kovan: `0x55ABBa8d669D60A10c104CC493ec5ef389EC92bb`
- goerli: `0x9788C4E93f9002a7ad8e72633b11E8d1ecd51f9b`
- binance smart chain mainnet: `0x2352c63A83f9Fd126af8676146721Fa00924d7e4`
- binance smart chain testnet: `0x2352c63A83f9Fd126af8676146721Fa00924d7e4`
- polygon: `0x2352c63A83f9Fd126af8676146721Fa00924d7e4`
- mumbai: `0x2352c63A83f9Fd126af8676146721Fa00924d7e4`
- Optimism: `0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC`
- Optimism Kovan: `0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC`
- arbitrum: `0x151E24A486D7258dd7C33Fb67E4bB01919B7B32c`
- avalanche: `0xD023D153a0DFa485130ECFdE2FAA7e612EF94818`
- fantom: `0x07f697424ABe762bB808c109860c04eA488ff92B`

### Library

There are separate libraries for [web3.js](https://github.com/ethereum/web3.js/)
and [ethers.js](https://github.com/ethers-io/ethers.js/), both with identical
APIs. Just import the functions from either `eth-balance-checker/lib/web3` or
`eth-balance-checker/lib/ethers`. For all functions, pass `"0x0"` as the "token"
address to get the ether balance of an address.

All functions also take in an optional 4th options parameter, those options are as follows:

```typescript
interface Options {
  // Choose a custom contract address. Must be provided to run the
  // code on non-mainnet network.
  contractAddress?: string;
}
```

#### getAddressBalances

##### Parameters
* `provider: Web3 | Ethers.Provider` - The provider to use for the contract call.
* `address: string` - The address to lookup balances for
* `tokens: string[]` - Array of token contract addresses. Only supports ERC20 tokens.
* `options?: Options` - Options for the contract, see above for options.

##### Returns
```js
Promise<{
  // Ether balance
  "0x0": "100",
  // Token balances
  "0x123...": "500",
  "0x456...": "100000",
  ...
}>
```

##### Example
```ts
import Web3 from 'web3';
import { getAddressBalances } from 'eth-balance-checker/lib/web3';

const web3 = new Web3(...);
const address = '0x123...';
const tokens = ['0x0', '0x456...'];
getAddressBalances(web3, address, tokens).then(balances => {
  console.log(balances); // { "0x0": "100", "0x456...": "200" }
});
```

#### getAddressesBalances

##### Parameters
* `provider: Web3 | Ethers.Provider` - The provider to use for the contract call.
* `addresses: string[]` - Array of addresses to lookup balances for.
* `tokens: string[]` - Array of token contract addresses. Only supports ERC20 tokens.
* `options?: Options` - Options for the contract, see above for options.

##### Returns
```js
Promise<{
  // Address as the key
  "0x123...": {
    // Ether balance
    "0x0": "100",
    // Token balances
    "0x456...": "500",
    "0x789...": "10000",
    ...
  },
  ...
}>
```

##### Example
```ts
import * as Ethers from 'ethers';
import { getAddressesBalances } from 'eth-balance-checker/lib/ethers';

const ethers = Ethers.getDefaultProvider();
const addresses = ['0x123...', '0x456...'];
const tokens = ['0x0', '0x789...'];
getAddressesBalances(ethers, addresses, tokens).then(balances => {
  console.log(balances); // { "0x123...": { "0x0": "100", ... }, ... }
});
```

## Development

### Setup

Requires node 8+. Just install packages, then use commands as needed:

```bash
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

## Credits

* Thanks to [@henrynguyen5](https://github.com/henrynguyen5) for adapting
[@DeltaBalances](https://github.com/DeltaBalances)' smart contract for this
* This library came out of EthSanFrancisco from the
[Safu Chrome Extension](https://github.com/grant-project/safu-extension) project.
