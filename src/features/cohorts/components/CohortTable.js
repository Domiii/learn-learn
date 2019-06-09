import map from 'lodash/map';
import isFunction from 'lodash/isFunction';

import React, { Component } from 'react';

import connect from 'connect';

import Cohorts from 'features/cohorts/api/Cohorts';

import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button, Badge } from 'reactstrap';

import renderLoadingIfNotLoaded from '../../../components/renderLoadingIfNotLoaded';
import CurrentUser from '../../../api/state/CurrentUser';


@connect(Cohorts)
class CohortNameCell extends Component {
  render() {
    const { cohorts, cohortId } = this.props;
    const name = cohorts.getCohortName(cohortId);

    return (<Link to={'/cohorts/' + cohortId}>{name}</Link>);
  }
}


@connect(Cohorts, CurrentUser)
class CohortCodeCell extends Component {
  newCode = () => {
    const { cohorts, cohortId } = this.props;
    cohorts.newCode(cohortId);
  }
  removeCode = () => {
    const { cohorts, cohortId } = this.props;
    cohorts.removeCode(cohortId);
  }
  render() {
    const { cohorts, currentUser, cohortId } = this.props;
    const cohort = cohorts.getCohort(cohortId);

    let loading = renderLoadingIfNotLoaded(cohort);
    if (loading) return loading;

    let { code, codeExpiresAt } = cohort;

    const expireDate = codeExpiresAt && codeExpiresAt.toDate();

    if (!expireDate || expireDate < new Date()) {
      // time's up!
      code = null;
    }

    let btn;
    if (currentUser.hasRole('Admin')) {
      btn = code ?
        <Button color="danger" onClick={this.removeCode}>X</Button> :
        <Button color="success" onClick={this.newCode}>New</Button>;
    }

    const expireEl = code && (<>
      <span className="gray" >(<Moment fromNow ago>{expireDate}</Moment>)
      </span>
    </>);


    return (<>
      <Badge color="success">{code}</Badge> {expireEl} {btn}
    </>);
  }
}

const columns = [
  {
    dataField: 'id',
    hidden: true
  }, {
    dataField: 'name',
    text: 'Cohort',
    sort: true,
    formatter: (cell, row, rowIndex) => <CohortNameCell cohortId={row.cohortId} />
  }, {
    dataField: 'userCount',
    text: 'Users',
    sort: true
  }, {
    dataField: 'createdAt',
    text: 'Created',
    sort: true,
    formatter: (createdAt) => {
      const date = createdAt && createdAt.toDate();
      return (<>
        <Moment fromNow>{date}</Moment> <span className="gray">(
          <Moment format="lll">{date}</Moment>
        )</span>
      </>);
    }
  }, {
    dataField: 'code',
    text: 'Code',
    sort: true,
    sortFunc: (a, b, order) => {
      if (order === 'asc') return !!a - !!b;
      else return !!b - !!a;
    },
    formatter: (code, { cohortId }) => {
      return <CohortCodeCell cohortId={cohortId} />
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
    let { cohorts, selector } = this.props;
    selector = selector || 'getAllCohortIds';
    const getter = cohorts[selector];
    if (!getter) {
      const valid = map(cohorts, (_, key) => key).filter(k => isFunction(cohorts[k]));
      throw new Error(`invalid selector "${selector}" does not exist - valid: ${valid.join(',')}`);
    }

    // load ids
    const ids = getter();
    let loading = renderLoadingIfNotLoaded(ids, { centered: true });
    if (loading) return loading;

    // load actual cohorts
    const list = cohorts.getCohortsOfIds(ids);
    loading = renderLoadingIfNotLoaded(list, { centered: true });
    if (loading) return loading;

    //console.warn(list);

    return (<BootstrapTable
      keyField="cohortId"
      data={list}
      {...defaultProps}
    />);
  }
}

export default CohortTable;