const ethers = require('ethers');

let provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/6a9086d09c8a4e0e99c279571ee00bad');

const contractAddress = '0x36ed56f5e2160d46c3cbeee285298cbe2f0b0022';


const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_artHash",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "artHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getLogLength",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "logs",
        "outputs": [
            {
                "name": "currentOwner",
                "type": "address"
            },
            {
                "name": "ownershipStartTime",
                "type": "uint256"
            },
            {
                "name": "ownershipEndTime",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, provider);

contract.owner().then((owner) => {

    console.log("currentOwner: ", owner)

});

contract.logs([]).then((log) => {

    console.log("alle logs: ", log)

});

// contract.logs[1].then((log) => {

//     console.log("zweites log: ", log)

// });


contract.on("OwnershipTransferred", (previousOwner, newOwner) => {
    // Called when anyone changes the value
    console.log(previousOwner);
    console.log(newOwner);

});

