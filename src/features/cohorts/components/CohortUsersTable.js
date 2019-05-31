import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';

class CohortUsersTable extends Component {
  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true
    }];

    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];

    return (<BootstrapTable
      bootstrap4
      keyField="id"
      data={products}
      columns={columns}
      defaultSorted={defaultSorted}
    />);
  }
}
 
export default CohortUsersTable;