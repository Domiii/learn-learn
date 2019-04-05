import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';


export default function AppRoutes() {
    return (<Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
  </Router>);
}