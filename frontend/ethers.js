
import { ethers } from 'ethers';
import 'ethers/dist/shims.js';
// const ethers = require('ethers');

// Once a Ganache node is running, it behaves very similar to a
// JSON-RPC API node.

// const url = "http://localhost:7545";
// const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
// const signer0 = provider.getSigner(0);
// const signer1 = provider.getSigner(1);

let infuraProvider = new ethers.providers.InfuraProvider('https://ropsten.infura.io/v3/6a9086d09c8a4e0e99c279571ee00bad');
// new ethers.providers.InfuraProvider([network = “homestead”][ , apiAccessToken]);
console.debug("Infura: ", infuraProvider.getBlockNumber());

const httpProvider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
// const getConnection = new ethers(httpProvider);
console.debug("Account: ", httpProvider.getNetwork());

// module.exports = { getConnection };