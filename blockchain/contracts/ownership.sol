pragma solidity >=0.4.21 <0.7.0;

contract Ownership {
  address public owner;
  
  struct ArtMapping {
    	uint timestamp;
      string owner;
      string artHash;
  }

  mapping (string => ArtMapping) artwork;

  event FileLogStatus(bool status, uint timestamp, string owner, string artHash);

  function set(string owner, string artHash) public{
    
  }

  constructor() public {
    owner = msg.sender;
  }


  modifier restricted() {
    if (msg.sender == owner) _;
  }



}