import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import connect from 'connect';
import CurrentUser from 'state/CurrentUser';
import NotLoaded from 'NotLoaded';

import RoleId from 'api/roles';

import Login from './pages/Login';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import LearnerPage from './pages/LearnerPage';
import LearnerLogPage from './pages/LearnerLogPage';
import LearnerPathsPage from './pages/LearnerPathsPage';
import NotFound404 from './pages/NotFound404';

import Loading from 'components/Loading';
import CohortPage from './features/cohorts/components/CohortPage';
import CohortsPage from './features/cohorts/components/CohortsPage';
import AdminPage from './pages/AdminPage';

@connect({ _currentUser: CurrentUser })
class UserRoute extends Component {
  route = (props) => {
    const { Comp, _currentUser, ...otherProps } = this.props;
    //console.log('UserRoute', Comp.name);
    return _currentUser.uid ?
      <Comp {...props} {...otherProps} /> :
      <Redirect to='/login' />;
  };
  render() {
    return (
      <Route {...this.props}
        render={this.route}
      />
    )
  }
}

@connect({ _currentUser: CurrentUser })
class NoUserRoute extends Component {
  route = (props) => {
    const { Comp, _currentUser, ...otherProps } = this.props;
    //console.log('NoUserRoute', Comp.name);
    return !_currentUser.uid ?
      <Comp {...props} /> :
      <Redirect to='/' />;
  };
  render() {
    return (
      <Route {...this.props}
        render={this.route}
      />
    )
  }
}

@connect({ _currentUser: CurrentUser })
class AdminRoute extends Component {
  route = (props) => {
    const { Comp, _currentUser, ...otherProps } = this.props;
    //console.log('AdminRoute', Comp.name);
    if (_currentUser.displayRole === NotLoaded) {
      return (<Loading centered />);
    }
    return _currentUser.displayRole >= RoleId.Admin ?
      <Comp {...props} /> :
      <Redirect to='/' />;
  };
  render() {
    return (
      <Route {...this.props}
        render={this.route}
      />
    );
  }
}

export default function AppRoutes() {
  return (
    <Switch>
      <NoUserRoute exact path="/login" Comp={Login} />
      
      <UserRoute exact path="/" Comp={Home} />
      <UserRoute exact path="/log" Comp={LearnerLogPage} />
      <UserRoute exact path="/learner" Comp={LearnerPage} />
      <UserRoute exact path="/learning-path" Comp={LearnerPathsPage} />
      <UserRoute path="/cohorts/:mine?" Comp={CohortsPage} />
      <UserRoute path="/cohort/:cohortId?" Comp={CohortPage} />

      <AdminRoute exact path="/users" Comp={UserPage} />
      <AdminRoute path="/admin/:category?" Comp={AdminPage} />

      <Route component={NotFound404} />
    </Switch>
  );
}