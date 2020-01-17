import { ethers } from 'ethers';
import 'ethers/dist/shims.js';
const infuraProvider = require('./BCConnection');


// Getting the accounts
// const signer0 = provider.getSigner(0);
// const signer1 = provider.getSigner(1);

const address = "0x5b3A61104f9Db9488880389F65b33eB0a1710D8B";

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
