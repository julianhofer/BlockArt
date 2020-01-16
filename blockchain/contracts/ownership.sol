pragma solidity >=0.4.22 <0.7.0;

contract Ownership {
  address public owner;
  bytes32 name;
  bytes32 artHash;

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
  
    struct ArtMapping {
        uint timestamp;
        address owner;
    }

    // validates the current Ownership
    event ArtLogStatus(bool status, uint timestamp, address owner, bytes32 artHash);
    
    // triggers event of the Ownership transfer
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    mapping (bytes32 => ArtMapping) artwork;
    
    constructor(bytes32 _name) public {
        owner = msg.sender;
        name = _name;
    }
    
    // stores the owner of the artwork in a timestamp block
    function setOwner(address _owner, bytes32 _artHash) public {
        if (artwork[_artHash].timestamp == 0) {
          artwork[_artHash] = ArtMapping(block.timestamp, _owner);
        
          // triggers an event to the frontend as validation since when and who owns the artwork
          emit ArtLogStatus(true, block.timestamp, _owner, artHash);
        } else {
          // returns a false value to frontend
          emit ArtLogStatus(false, block.timestamp, _owner, artHash);
        }
    }
    
    // returns artwork information to the frontend
    function getOwner(bytes32 _artHash) internal view returns (uint, address) {
        return (artwork[_artHash].timestamp, artwork[_artHash].owner);
    }
    
    // transfers the ownership of the contract to a new adress
    function transferOwnership(address _newOwner) public isOwner {
        // function just can be called from the previous owner
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

}