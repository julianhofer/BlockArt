pragma solidity >=0.4.21 <0.7.0;

contract Ownership {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }
    modifier restricted() {
    if (msg.sender == owner) _;
  }
  
  struct ArtMapping {
    	uint timestamp;
      string owner;
      string artHash;
  }

  mapping (string => ArtMapping) artwork;

  event ArtLogStatus(bool status, uint timestamp, string owner, string artHash);

  // stores the owner of the artwork in a timestamp block
  function setOwner(string owner, string artHash) public {
    if (artwork[artHash].timestamp == 0){
      artwork[artHash] = ArtMapping(block.timestamp, owner);

      //triggers an event to frontend as validation since when and who owns the artwork
      ArtLogStatus(true, block.timestamp, owner, artHash);
    }
    else {

      // returns a false value to frontend
      ArtLogStatus(false, block.timestamp, owner, artHash);
    }
  }

  // returns artwork information to the frontend
  function getOwner(string artHash) internal view returns (uint timestamp, string owner){
    return (artwork[artHash].timestamp, artwork[artHash].owner);
  }



}