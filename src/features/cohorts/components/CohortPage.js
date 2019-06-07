import React, { Component } from 'react';

import CohortPanel from './CohortPanel';
import CohortTable from './CohortTable';
import connect from 'connect';
import CurrentUser from 'api/state/CurrentUser';

@connect(CurrentUser)
class CohortPage extends Component {
  state = {}
  render() {
    const { currentUser, match: { cohortId } } = this.props;

    if (cohortId) {
      return <CohortPanel cohortId={cohortId} />;
    }
    else {
      return (<div className="full-width">
        <CohortTable selector="getMyCohortIds" />
        {currentUser.hasRole('Admin') && <CohortTable selector="getNotMyCohortIds" />}
      </div>);
    }
  }
}

export default CohortPage;