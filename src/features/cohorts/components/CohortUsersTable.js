import React, { Component } from 'react';

import connect from 'connect';

import Cohorts from 'features/cohorts/api/Cohorts';
import Users from 'state/Users';

import BootstrapTable from 'react-bootstrap-table-next';

function renderCell(cell, row, rowIndex) {
  return cell;
}

const columns = [{
  dataField: 'name',
  text: 'Name',
  sort: true,
  // formatter: renderUserName
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

@connect(Cohorts)
class CohortUsersTable extends Component {
  render() {
    const { cohorts } = this.props;

    const users = cohorts.;

    return (<BootstrapTable
      bootstrap4
      keyField="id"
      data={users}
      columns={columns}
      defaultSorted={defaultSorted}
    />);
  }
}
 
export default CohortUsersTable;