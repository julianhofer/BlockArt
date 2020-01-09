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
      const web3 = await getConnection();
      const account = await web3.eth.getAccounts();

      this.setState({ account: account[0] });
      console.log("Account: ", account[0])

      const network = await web3.eth.net.getNetworkType();
      console.log("Netzwerk: ", network);

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
