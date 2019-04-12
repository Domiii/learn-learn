import React, {Component} from 'react';

import { Button } from 'reactstrap';

export default class Home extends Component {
  toggleDoor = () => {
    
  };

  render() {
    return (<div>
      hi!
      <p>
        <Button onClick={this.toggleDoor}></Button>
      </p>
    </div>);
  }
}