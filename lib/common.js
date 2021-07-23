"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddressBalances = exports.DEFAULT_CONTRACT_ADDRESS = void 0;
exports.DEFAULT_CONTRACT_ADDRESS = '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39';
function formatAddressBalances(values, addresses, tokens) {
    var balances = {};
    addresses.forEach(function (addr, addrIdx) {
        balances[addr] = {};
        tokens.forEach(function (tokenAddr, tokenIdx) {
            var balance = values[addrIdx * tokens.length + tokenIdx];
            balances[addr][tokenAddr] = balance.toString();
        });
    });
    return balances;
}
exports.formatAddressBalances = formatAddressBalances;
