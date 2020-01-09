pragma solidity >=0.4.21 <0.7.0;

contract Ownership {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
    //hash
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }
    // Setzt neuen Owner für den SmartContract
  function changeOwner(address new_address) public restricted {
    
  }


}