import React, {
  Component
} from 'react';

import CurrentUser from 'state/CurrentUser';
import LearnerLogEntries from 'state/LearnerLogEntries';

import connect from 'connect';

//import MonacoEditor from 'components/editors/MonacoEditor';
import MarkdownEditor from 'components/editors/MarkdownEditor';

import { Button } from 'reactstrap';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * TODO: Add monaco?
 *    https://github.com/Microsoft/monaco-editor-samples
 *    https://nerdymishka.com/blog/monaco-editor-quick-start/
 */


class LearnerLogEntryEditor extends Component {
  render() {
    return (
      <MarkdownEditor />
    );
  }
}

class LogEntryAdd extends Component {
  state = {  };

  onClickAdd = () => {
    this.setState({adding: !this.state.adding});
  };

  render() { 
    const { adding } = this.state;
    return ( <div className="full-width">
      <Button active={adding} onClick={this.onClickAdd}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        Add Log Entry
      </Button>
      { adding && <LearnerLogEntryEditor /> }
    </div> );
  }
}

@connect(CurrentUser, LearnerLogEntries)
class LearnerLogPage extends Component {
  state = {}
  render() {
    const {
      currentUser,
      learnerLogEntries
    } = this.props;
    
    //const entries = learnerLogEntries.byUser(currentUser.uid);
    
    return (<>
      <LogEntryAdd />
      {/* entries.map() */}
    </>);
  }
}

export default LearnerLogPage;