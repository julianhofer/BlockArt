import { ethers } from 'ethers';
import 'ethers/dist/shims.js';
// import 'ethers/dist/shims.js';
// const ethers = require('ethers');

// Once a Ganache node is running, it behaves very similar to a
// JSON-RPC API node.

// const url = "http://localhost:7545";
// const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
// const signer0 = provider.getSigner(0);
// const signer1 = provider.getSigner(1);

const address = "0x5b3A61104f9Db9488880389F65b33eB0a1710D8B";

const infuraProvider = new ethers.providers.InfuraProvider('https://ropsten.infura.io/v3/6a9086d09c8a4e0e99c279571ee00bad');
// module.exports = { infuraProvider };


infuraProvider.getBalance(address).then((balance) => {

    // balance is a BigNumber (in wei); format is as a sting (in ether)
    let etherString = ethers.utils.formatEther(balance);

    console.debug("Balance: " + etherString);
});
console.log("Balance: " + etherString);
console.log("log");
console.debug("debug");

infuraProvider.getNetwork().then((network) => {

    console.log("Infura: ", network);
});
console.log("Infura: ", network);


// const httpProvider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
// const getConnection = new ethers(httpProvider);
// console.debug("Account: ", httpProvider.getNetwork());

// module.exports = { getConnection };