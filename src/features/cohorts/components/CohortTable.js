import React, { Component } from 'react';

import connect from 'connect';

import Cohorts from 'features/cohorts/api/Cohorts';

import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import renderLoadingIfNotLoaded from '../../../components/renderLoadingIfNotLoaded';


@connect(Cohorts)
class CohortName extends Component {
  render() {
    const { cohorts, cohortId } = this.props;
    const name = cohorts.getCohortName(cohortId);

    return (<Link to={'/cohorts/' + cohortId}>{name}</Link>);
  }
}

const columns = [
  {
    dataField: 'id',
    hidden: true
  }, {
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex) => <CohortName cohortId={row.cohortId} />
  }, {
    dataField: 'userCount',
    text: 'Users',
    sort: true
  }, {
    dataField: 'createdAt',
    text: 'Created',
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
  dataField: 'createdAt',
  order: 'desc'
}];

const defaultProps = {
  bootstrap4: true,
  columns,
  defaultSorted
};

@connect(Cohorts)
class CohortTable extends Component {
  render() {
    const { cohorts, selector } = this.props;

    const list = cohorts[selector || 'allCohortsArray']();

    const loading = renderLoadingIfNotLoaded(list, { centered: true });
    if (loading) return loading;

    return (<BootstrapTable
      keyField="cohortId"
      data={list}
      {...defaultProps}
    />);
  }
}

export default CohortTable;