import React, { Component } from 'react';
import { Table } from 'reactstrap';

class LearnerPathRow extends Component {
  state = {  }
  render() { 
    return ( <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr> );
  }
}

// TODO: use https://www.npmjs.com/package/react-table

class LearnerPathList extends Component {
  state = {  }
  render() { 
    return ( <Table className="full-width">
      <thead>
        <th>Name</th>
        <th></th>
        <th></th>
      </thead>
      <LearnerPathRow />
    </Table> );
  }
}
 
export default LearnerPathList;