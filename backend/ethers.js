// const contract = require('./BCConnection');
const wallets = require('./wallets');
const privateKeys = require('./keys');
const ethers = require('ethers');
// const provider = require('./BCConnection');
// const contractAddress = require('./BCConnection');
// const abi = require('./abi');
const smartContract = require('./contracts/ArtWorkContract')

// contract.owner().then((owner) => {

//     console.log("currentOwner: ", owner)

// });

// contract.artHash().then((artHash) => {
//     console.log("artHash: ", artHash)
// });

// contract.logs([]).then((log) => {

//     console.log("alle logs: ", log)

// });


const contractAddress = '0x36ed56f5e2160d46c3cbeee285298cbe2f0b0022';
const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/6a9086d09c8a4e0e99c279571ee00bad');
const abi = smartContract.abi;

const contract = new ethers.Contract(contractAddress, abi, provider);

let wallet = new ethers.Wallet("0x" + privateKeys[1], provider);
let contractWithSigner = contract.connect(wallet);

(async function () {

    let transferOs = await contractWithSigner.transferOwnership("0x" + wallets[0]);
    console.log("TransferHash: ", transferOs.hash);

    await transferOs.wait();

    let newOwner = await contract.owner();

    console.log("newOwner: ", newOwner);

})();


contract.on("OwnershipTransferred", (previousOwner, newOwner) => {
    // Called when anyone changes the value
    console.log(previousOwner);
    console.log(newOwner);

    contract.artHash().then((artHash) => {
        console.log("artHash: ", artHash)
    });
});

