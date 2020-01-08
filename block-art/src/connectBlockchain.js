import Web3 from "web3";

const getConnection = () => {

    const provider = new Web3(Web3.givenProvider || "http://localhost:7545");


    const web3 = new Web3(provider);
    console.log("Es wird die lokale Blockchain auf Port 7545 verwendet.");


    const network = web3.eth.net.getNetworkType();
    console.log("Netzwerk: " + network);

};

export default getConnection;


// const getConnection = () =>
//     new Promise((resolve, reject) => {

//         const provider = new Web3.givenProvider.HttpProvider(
//             "http://127.0.0.1:7545"
//         );
//         const web3 = new Web3(Provider);
//         console.log("Es wir die lokale Blockchain auf Port 7545 verwendet.");
//         resolve(web3);

//         const network = await web3.eth.net.getNetworkType();
//         console.log("Netzwerk: " + network);

//     });

// export default getConnection;