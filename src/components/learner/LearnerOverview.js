
import React, { Component } from 'react';
import Learner from 'state/Learner';

import connect from 'connect';

@connect(Learner)
class LearnerOverview extends Component {
  render() {
    return (
      'learner'
    );
  }
}

export default LearnerOverview;