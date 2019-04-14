import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LearnerPathEditor from './LearnerPathEditor';

class LearnerPathAddView extends Component {
  state = {  };

  onClickAdd = () => {
    this.setState({adding: !this.state.adding});
  };

  render() { 
    const { adding } = this.state;
    return ( <div>
      <Button active={adding} onClick={this.onClickAdd}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        Add Learner Path
      </Button>
      { adding && LearnerPathEditor }
    </div> );
  }
}
 
export default LearnerPathAddView;