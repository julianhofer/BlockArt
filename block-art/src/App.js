import React, { Component } from 'react';
import './App.css';
import getConnection from './connectBlockchain';


class App extends Component {


  UNSAFE_componentWillMount() {
    getConnection();
  }

  render() {
    return (
      <div className="container">
        <h1>BlockArt</h1>
      </div>
    );
  }
}

export default App;
