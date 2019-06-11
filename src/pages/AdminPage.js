import React, { Component } from 'react';

import CohortsAdminPanel from '../features/cohorts/components/CohortsAdminPanel';

//@connect(CurrentUser)
class AdminPage extends Component {
  state = {}
  render() {
    return (<div className="full-width">
      <CohortsAdminPanel />
    </div>);
  }
}

export default AdminPage;