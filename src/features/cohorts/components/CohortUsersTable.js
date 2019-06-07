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
    text: 'Name',
    sort: true,
    formatter: (cell, row) => <UserLabel uid={row.uid} />
  },
  {
    dataField: 'joined',
    text: 'Joined',
    sort: true,
    formatter: (cell, row, rowIndex) => {
      const date = cell && cell.toDate();
      return (<>
        <Moment>{date}</Moment>
        (<Moment fromNow>{date}</Moment>)
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
    const { cohorts, users } = this.props;

    const entries = cohorts.getUserEntriesOfCohort();
    const loading = renderLoadingIfNotLoaded(entries, { centered: true });
    if (loading) return loading;

    const uids = Object.keys(entries);
    const list = uids.map(
      uid => {
        const user = users.getUser(uid);
        if (user) {
          const {
            displayName,
            role
          } = user;
          return {
            uid,
            joined: entries[uid].createdAt,
            displayName,
            role
          };
        }
        return { uid };
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