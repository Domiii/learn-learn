import map from 'lodash/map';

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import connect from 'connect';
import NotLoaded from 'NotLoaded';

import LearnerOverview from 'components/learner/LearnerOverview';
import Loading from 'components/Loading';

class LearnerPage extends Component {
  render() {
    return (<div className="full-width">
      <LearnerOverview />
    </div>);
  }
}

export default LearnerPage;