const BalanceChecker = artifacts.require('./BalanceChecker.sol');
const TestToken = artifacts.require('./TestToken.sol');

module.exports = function(deployer, network) {
  deployer.deploy(BalanceChecker);
  if (network === 'development') {
    deployer.deploy(TestToken);
  }
};
