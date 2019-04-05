import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'unstated';
import { BrowserRouter } from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';

import AppRoutes from './AppRoutes';
import Navbar from 'components/navbar';

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <Container className="app-cont">
            <div className="app-nav">
              <Navbar />
            </div>
            <div className="app-main">
              <AppRoutes />
            </div>
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
