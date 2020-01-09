import Web3 from "web3";

const getConnection = () =>
    new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            }
            else if (window.web3) {
                // Use Mist/MetaMask's provider.
                const web3 = window.web3;
                console.log("Injected web3 detected.");
                resolve(web3);
            }
            // Fallback to localhost
            else {
                const provider = new Web3.providers.HttpProvider(
                    "http://127.0.0.1:7545"
                );
                const web3 = new Web3(provider);
                console.log("Es wird die lokale Blockchain auf Port 7545 verwendet.");
                resolve(web3);
            }
        });
    });

export default getConnection;

// const getConnection = () => {
//     new Promise((resolve, reject) => {
//         window.addEventListener("load", async () => {

//             if (window.ethereum) {
//                 const web3 = new Web3(window.ethereum);
//                 try{


//                 const web3 = window.web3;
//                 console.log("Injected web3 detected.");
//                 resolve(web3);
//             } else {


//                 const web3 = new Web3(window.ethereum);
//                 // const provider = new Web3(Web3.providers.HttpProvider || "http://127.0.0.1:7545");
//                 // const web3 = new Web3(provider);
//                 // console.log("Es wird die lokale Blockchain auf Port 7545 verwendet.");
//                 const provider = new Web3.providers.HttpProvider(
//                     "http://127.0.0.1:7545"
//                 );
//                 const web3 = new Web3(provider);
//                 console.log("Es wird die lokale Blockchain auf Port 7545 verwendet.");
//                 resolve(web3);

//                 const network = await web3.eth.net.getNetworkType();
//                 console.log("Netzwerk: ", network);
//                 const account = await web3.eth.getAccounts();
//                 console.log("Account: ", account[1]);
//             }
//         }
//         });
//     });
// }




// export default getConnection;


// // const getConnection = () =>
// //     new Promise((resolve, reject) => {

// //         const provider = new Web3.givenProvider.HttpProvider(
// //             "http://127.0.0.1:7545"
// //         );
// //         const web3 = new Web3(Provider);
// //         console.log("Es wir die lokale Blockchain auf Port 7545 verwendet.");
// //         resolve(web3);

// //         const network = await web3.eth.net.getNetworkType();
// //         console.log("Netzwerk: " + network);

// //     });

// // export default getConnection;