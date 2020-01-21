import { ethers } from 'ethers';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import smartcontract from './SmartContract/ArtWorkContract.json';
// const owner = require('./ethers');

export default class HelloWorldApp extends Component {

  render() {

    let contractAbi = smartcontract.abi;
    // console.log("contractAbi: ", contractAbi);

    let provider = new ethers.providers.InfuraProvider('https://ropsten.infura.io/v3/6a9086d09c8a4e0e99c279571ee00bad');

    let contractAddress = '0x36ed56f5e2160d46c3cbeee285298cbe2f0b0022';

    let contract = new ethers.Contract(contractAddress, contractAbi, provider);

    contract.currentOwner().then((currentOwner) => {

      console.log("currentOwner: ", currentOwner)

    });

    // let abi = [
    //   {
    //     "constant": false,
    //     "inputs": [
    //       {
    //         "name": "_newOwner",
    //         "type": "address"
    //       }
    //     ],
    //     "name": "transferOwnership",
    //     "outputs": [],
    //     "payable": false,
    //     "stateMutability": "nonpayable",
    //     "type": "function"
    //   },
    //   {
    //     "inputs": [
    //       {
    //         "name": "_artHash",
    //         "type": "bytes32"
    //       }
    //     ],
    //     "payable": false,
    //     "stateMutability": "nonpayable",
    //     "type": "constructor"
    //   },
    //   {
    //     "anonymous": false,
    //     "inputs": [
    //       {
    //         "indexed": true,
    //         "name": "previousOwner",
    //         "type": "address"
    //       },
    //       {
    //         "indexed": true,
    //         "name": "newOwner",
    //         "type": "address"
    //       }
    //     ],
    //     "name": "OwnershipTransferred",
    //     "type": "event"
    //   },
    //   {
    //     "constant": true,
    //     "inputs": [],
    //     "name": "artHash",
    //     "outputs": [
    //       {
    //         "name": "",
    //         "type": "bytes32"
    //       }
    //     ],
    //     "payable": false,
    //     "stateMutability": "view",
    //     "type": "function"
    //   },
    //   {
    //     "constant": true,
    //     "inputs": [],
    //     "name": "getLogLength",
    //     "outputs": [
    //       {
    //         "name": "",
    //         "type": "uint256"
    //       }
    //     ],
    //     "payable": false,
    //     "stateMutability": "view",
    //     "type": "function"
    //   },
    //   {
    //     "constant": true,
    //     "inputs": [
    //       {
    //         "name": "",
    //         "type": "uint256"
    //       }
    //     ],
    //     "name": "logs",
    //     "outputs": [
    //       {
    //         "name": "currentOwner",
    //         "type": "address"
    //       },
    //       {
    //         "name": "ownershipStartTime",
    //         "type": "uint256"
    //       },
    //       {
    //         "name": "ownershipEndTime",
    //         "type": "uint256"
    //       }
    //     ],
    //     "payable": false,
    //     "stateMutability": "view",
    //     "type": "function"
    //   },
    //   {
    //     "constant": true,
    //     "inputs": [],
    //     "name": "owner",
    //     "outputs": [
    //       {
    //         "name": "",
    //         "type": "address"
    //       }
    //     ],
    //     "payable": false,
    //     "stateMutability": "view",
    //     "type": "function"
    //   }
    // ];







    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}