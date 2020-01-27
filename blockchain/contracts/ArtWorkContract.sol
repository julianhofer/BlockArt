pragma solidity >=0.4.22 <0.7.0;

contract ArtWorkContract {
  address public owner;
  bytes32 public artHash;
  uint timestamp;
  Log[] public logs;
  
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
  
    struct Log {
        address currentOwner;
        uint ownershipStartTime;
        uint ownershipEndTime;
    }
    
    // triggers event of the Ownership transfer
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    
    constructor(bytes32 _artHash) public {
        owner = msg.sender;
        timestamp = now;
        artHash = _artHash;
    }
    
    
    function getLogLength() public view returns (uint) {
        return logs.length;    
    }
    
    // function can only be called from the previous owner
    function transferOwnership(address _newOwner) public isOwner {
        
        if(owner == _newOwner) {
            revert('New Owner cannot be old Owner!');
        }
        
        logs.push(Log(_newOwner, timestamp, now));
        timestamp = now;
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
        
    }
    
}