import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ReactTable from 'react-table';


const reactTableProps = {
  columns: [
    {
      Header: 'col1'
    },
    {
      Header: 'col2'
    }
  ],
  TableComponent: Table,
  striped: true
};

// TODO: use https://www.npmjs.com/package/react-table


class LearnerPathList extends Component {
  state = {  }
  render() { 
    return (
      <ReactTable {...reactTableProps} className="full-width -striped -highlight">
      </ReactTable>
    );
  }
}
 
export default LearnerPathList;