pragma solidity >=0.4.22 <0.7.0;

contract Ownership {
  address owner;
  bytes32 name;
  bytes32 artHash;

  // constructor(bytes32 _name) public {
  //    owner = msg.sender;
  //     name = _name;
  // }

  //   modifier restricted() {
  //   if (msg.sender == owner) _;
  // }
  
  struct ArtMapping {
    	uint timestamp;
      bytes32 owner;
      bytes32 artHash;
  }

  mapping (string => ArtMapping) artwork;

  event ArtLogStatus(bool status, uint timestamp, bytes32 owner, bytes32 artHash);

  // stores the owner of the artwork in a timestamp block
  function setOwner(bytes32 owner, bytes32 artHash) public {
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
  function getOwner(bytes32 artHash) internal view returns (uint timestamp, bytes32 owner){
    return (artwork[artHash].timestamp, artwork[artHash].owner);
  }



}