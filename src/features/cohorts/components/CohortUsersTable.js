import React, { Component } from 'react';

import connect from 'connect';

import Cohorts from 'features/cohorts/api/Cohorts';
import Users from 'features/users/api/Users';

import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import renderLoadingIfNotLoaded from '../../../components/renderLoadingIfNotLoaded';
import UserLabel from '../../users/components/UserLabel';


const columns = [
  {
    dataField: 'uid',
    hidden: true
  },
  {
    dataField: 'displayName',
    text: 'User',
    sort: true,
    formatter: (cell, {uid}) => <UserLabel uid={uid} />
  },
  {
    dataField: 'joined',
    text: 'Joined',
    sort: true,
    formatter: (cell, row, rowIndex) => {
      const date = cell && cell.toDate();
      return (<>
        <Moment fromNow>{date}</Moment> <span className="gray">(
          <Moment format="lll">{date}</Moment>
          )</span>
      </>);
    }
  }
];

const defaultSorted = [{
  dataField: 'joined',
  order: 'desc'
}];

@connect(Cohorts, Users)
class CohortUsersTable extends Component {
  render() {
    const { cohorts, users, cohortId } = this.props;

    // load cohort user entries
    const entries = cohorts.getUserEntriesOfCohort(cohortId);
    let loading = renderLoadingIfNotLoaded(entries, { centered: true });
    if (loading) return loading;

    // load users
    const uids = Object.keys(entries);
    let list = users.getUsersOfIds(uids);
    loading = renderLoadingIfNotLoaded(list, { centered: true });
    if (loading) return loading;

    list = list.map(
      user => {
        const {
          uid,
          displayName,
          role
        } = user;
        return {
          uid,
          joined: entries[uid].createdAt,
          displayName,
          role
        };
      });

    return (<BootstrapTable
      bootstrap4
      keyField="uid"
      data={list}
      columns={columns}
      defaultSorted={defaultSorted}
    />);
  }
}

export default CohortUsersTable;