import React, { Component } from 'react';
import { Text, View } from 'react-native';
import './ethers';


export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

// class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     account: null,
  //     web3: null,
  //   }
  // }

  // state = {
  //   ethers: null,
  //   account: null
  // };

  // componentDidMount = async () => {

  //   try {
  //     const ethers = await getConnection();
  //     const account = await ethers.eth.getAccounts();

  //     this.setState({ account: account[0] });
  //     console.log("Account: ", account[0])

  //     const network = await ethers.eth.net.getNetworkType();
  //     console.log("Netzwerk: ", network);

  //     this.setState({
  //       web3,
  //       account
  //     });

  //   } catch (error) {

  //     alert(
  //       `Failed to connect`,
  //     );
  //     console.error(error);
  //   }
  // };

  // UNSAFE_componentWillMount() {
  //   this.getConnection();
  // }


//   render() {
//     return (
//       <div className="container">
//         {/* <h1>BlockArt</h1>
//         <p>Accountadresse: </p> */}
//       </div>
//     );
//   }
// }

// export default App;
