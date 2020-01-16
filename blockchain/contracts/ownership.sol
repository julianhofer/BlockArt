pragma solidity >=0.4.22 <0.7.0;

contract Ownership {
  address public owner;
  bytes32 name;
  bytes32 artHash;

  // constructor(bytes32 _name) public {
  //    owner = msg.sender;
  //     name = _name;
  // }

  //   modifier restricted() {
  //   if (msg.sender == owner) _;
  // }

      function ownable() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
  
  struct ArtMapping {
    	uint timestamp;
      address owner;
      bytes32 artHash;
  }

  mapping (string => ArtMapping) artwork;

  // validates the current Ownership
  event ArtLogStatus(bool status, uint timestamp, bytes32 owner, bytes32 artHash);

  // triggers event of the Ownership transfer
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  // stores the owner of the artwork in a timestamp block
  function setOwner(bytes32 owner, bytes32 artHash) public {
    if (artwork[artHash].timestamp == 0) {
      artwork[artHash] = ArtMapping(block.timestamp, owner);

      // triggers an event to the frontend as validation since when and who owns the artwork
      ArtLogStatus(true, block.timestamp, owner, artHash);
    } else {
      // returns a false value to frontend
      ArtLogStatus(false, block.timestamp, owner, artHash);
    }
  }

  // returns artwork information to the frontend
  function getOwner(bytes32 artHash) internal view returns (uint timestamp, bytes32 owner) {
    return (artwork[artHash].timestamp, artwork[artHash].owner);
  }

  // transfers the ownership of the contract to a new adress
  function transferOwnership(address newOwner) public isOwner {
    // function just can be called from the previous owner
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }



}