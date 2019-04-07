import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import connect from 'connect';
import CurrentUser from 'state/CurrentUser';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound404 from './pages/NotFound404';

@connect({ _currentUser: CurrentUser })
class UserRoute extends Component {
  route = (props) => {
    const { component: ComponenT, _currentUser, ...otherProps } = this.props
    return _currentUser.value ?
      <ComponenT {...props} /> :
      <Redirect to='/login' />;
  };
  render() {
    return (
      <Route
        render={this.route}
      />
    )
  }
}

@connect({ _currentUser: CurrentUser })
class NoUserRoute extends Component {
  route = (props) => {
    const { component: ComponenT, _currentUser, ...otherProps } = this.props
    return !_currentUser.value ?
      <ComponenT {...props} /> :
      <Redirect to='/' />;
  };
  render() {
    return (
      <Route
        render={this.route}
      />
    )
  }
}

export default function AppRoutes() {
  return (
    <Switch>
      <NoUserRoute exact path="/login" component={Login} />
      <UserRoute exact path="/" component={Home} />
      <Route component={NotFound404} />
    </Switch>
  );
}