import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import LearnerPathList from 'components/learnerPaths/LearnerPathList';
import LearnerPathAddView from 'components/learnerPaths/LearnerPathAddView';

class LearnerPathsPage extends Component {
  state = {  };

  render() { 
    return ( <Flexbox flexDirection="column" width="100%">
      <LearnerPathList />
      <LearnerPathAddView />
    </Flexbox> );
  }
}
 
export default LearnerPathsPage;