
import React, { Component } from 'react';

import { faPlus, faUserSecret, faUserFriends, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flexbox from 'flexbox-react';
import { Button, Alert } from 'reactstrap';

import connect from 'connect';
import Learners from 'state/Learners';


const EncouragementTexts = [
  '🌇 I took another step in the journey... 🧠',
  '😄 I\'m making progress...! (am I?!) 🤔',
  '🎉 I engaged! That\'s always the first step! 🎉'
];

const SkipTexts = [
  'Not today',
  'Too tired for this',
  'Not feeling this',
  'Skip (for now)',
  'Not important enough'
];

class LogEntryEncouragement extends Component {
  state = {
    textIdx: Math.floor(Math.random() * EncouragementTexts.length)
  };

  render() {
    return (
      <Alert color="success">{EncouragementTexts[this.state.textIdx]}</Alert>
    );
  }
}

const LearnerLogSections = [
  {
    title: 'Drive'
    // Multiple choice: Flow, Routine, Discipline
  },
  {
    title: 'What did I do?',
    desc: 'Short Summary + My Main Concepts and Keywords for today'
  },
  {
    title: 'What steps did I take?',
    desc: 'More detailed description of my process'
  },
  {
    title: 'Aha! moments + Warm and fuzzy feelings of accomplishment'
  },
  {
    title: 'Hardship, Difficulties + Failures'
  },
  {
    title: 'Goals + Results'
  },
  {
    title: 'Feedback'
  }
];


class LearnerLog extends Component {
  render() {
    return 'log';
  }
}

class AddButtons extends Component {
  render() {
    return (<Flexbox flexDirection="row" justifyContent="space-around" width="100%">
      <Button color="secondary">
        <FontAwesomeIcon icon={faPlus} />&nbsp;
        Regular Entry&nbsp;
      <FontAwesomeIcon className="font-size-1" icon={faUserSecret} />
      </Button>
      <Button color="primary">
        <FontAwesomeIcon icon={faPlus} />&nbsp;
        Class&nbsp;
      <span className="text-nowrap">
          <FontAwesomeIcon icon={faUserGraduate} />
          <FontAwesomeIcon icon={faUserGraduate} />
          <FontAwesomeIcon icon={faUserGraduate} />
        </span>
      </Button>
      <Button color="primary">
        <FontAwesomeIcon icon={faPlus} />&nbsp;
        Coach Session&nbsp;
      <FontAwesomeIcon className="font-size-1" icon={faUserFriends} />
      </Button>
    </Flexbox>);
  }
}

@connect(Learners)
class LearnerOverview extends Component {
  render() {
    return (<>
      <Flexbox height="2em" />
      <AddButtons />
      <LearnerLog />
    </>);
  }
}

export default LearnerOverview;