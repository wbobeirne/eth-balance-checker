// Fork of https://github.com/DeltaBalances/DeltaBalances.github.io/blob/master/smart_contract/deltabalances.sol
pragma solidity ^0.4.21;

// ERC20 contract interface
contract Token {
  function balanceOf(address /*tokenOwner*/) public view returns (uint /*balance*/);
  function transfer(address /*to*/, uint /*tokens*/) public returns (bool /*success*/);
}

contract BalanceChecker {
  /* Fallback function, don't accept any ETH */
  function() public payable {
    revert("BalanceChecker does not accept payments");
  }

  /*
    Check the token balance of a wallet in a token contract
    Avoids possible errors:
      - returns 0 on invalid exchange contract 
      - return 0 on non-contract address 
      
    Mainly for internal use, but public for anyone who thinks it is useful
  */
  function tokenBalance(address user, address token) public view returns (uint) {
    // check if token is actually a contract
    uint256 tokenCode;
    assembly { tokenCode := extcodesize(token) } // contract code size
  
    // is it a contract and does it implement balanceOf 
    if (tokenCode > 0 && token.call(bytes4(0x70a08231), user)) {  
      return Token(token).balanceOf(user);
    } else {
      return 0; // not a valid token, return 0 instead of error
    }
  }

  /*
    Check the token balances of a wallet for multiple tokens
    Uses tokenBalance() to be able to return, even if a token isn't valid 
    Possible error throws:
      - extremely large arrays (gas cost too high) 
          
    Returns array of token balances in wei units.
  */
  function balances(address user, address[] tokens) external view returns (uint[]) {
    uint[] memory addrBalances = new uint[](tokens.length);
    
    for (uint i = 0; i < tokens.length; i++) {
      if (tokens[i] != address(0x0)) { 
        addrBalances[i] = tokenBalance(user, tokens[i]);
      } else {
        addrBalances[i] = user.balance; // ETH balance    
      }
    }    
    return addrBalances;
  }
}