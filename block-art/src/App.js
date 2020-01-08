import React, { Component } from 'react';
import './App.css';
import './connectBlockchain';
import getConnection from './connectBlockchain';


class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     account: null,
  //     web3: null,
  //   }
  // }

  state = {
    web3: null,
    account: null
  };




  componentDidMount = async () => {


    try {
      // Get network provider and web3 instance.
      const web3 = await getConnection();


      // Use web3 to get the user's accounts.
      const account = await web3.eth.getAccounts();

      this.setState({ account: account[0] });
      console.log("Account: ", account[0])

      const network = await web3.eth.net.getNetworkType();
      console.log("Netzwerk: ", network);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        account
      });

    } catch (error) {

      alert(
        `Failed to connect`,
      );
      console.error(error);
    }
  };

  // UNSAFE_componentWillMount() {
  //   this.getConnection();
  // }


  render() {
    return (
      <div className="container">
        <h1>BlockArt</h1>
        <p>Accountadresse: {this.state.account}</p>
      </div>
    );
  }
}

export default App;
