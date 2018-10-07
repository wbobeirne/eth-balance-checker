const BalanceChecker = artifacts.require('BalanceChecker');
const TestToken = artifacts.require('TestToken');

contract('BalanceChecker', accounts => {
  let balanceChecker;
  let testToken;

  before(async () => {
    balanceChecker = await BalanceChecker.new({ from: accounts[0] });
    testToken = await TestToken.new({ from: accounts[0] });
  });

  it('deploys BalanceChecker', async () => {
    assert.ok(balanceChecker);
  });

  it('Correctly checks an ETH balance', async () => {
    const balance = web3.eth.getBalance(accounts[0]);
    const balances = await balanceChecker.balances.call(accounts[0], ['0x0']);
    console.log(await balanceChecker.balances.estimateGas(accounts[0], ['0x0']));
    assert.ok(balances[0]);
    assert.equal(balance.toString(), balances[0].toString());
  });

  it('Correctly checks a token balance', async () => {
    const tokenBalance = await testToken.balanceOf(accounts[0]);
    const balances = await balanceChecker.balances.call(accounts[0], [testToken.address]);
    assert.ok(balances[0]);
    assert.equal(balance.toString(), balances[0].toString());
  });
});