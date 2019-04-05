import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Learn-learn!
        </header>
        <AppRoutes />
      </div>
    );
  }
}

export default App;
