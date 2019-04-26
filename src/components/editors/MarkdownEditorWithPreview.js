import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import connect from 'connect';
import NotLoaded from 'NotLoaded';
import MarkdownTempStorage from 'state/MarkdownTempStorage';

import MarkdownEditor from './MarkdownEditor';
import MarkdownViewer from './MarkdownViewer';
import Loading from 'components/Loading';
import { MUIButton } from '@material-ui/core';


@connect(MarkdownTempStorage)
class MarkdownEditorWithPreview extends Component {
  defaultProps = {
    // auto save within this amount of milliseconds
    autoSaveThrottleDelay: 1000
  };
  state = {
    source: NotLoaded
  };

  componentDidUpdate({ markdownTempStorage: markdownTempStorageOld }) {
    const { markdownTempStorage: markdownTempStorageNew } = this.props;
    const { sourceName } = this.props;
    if (sourceName !== markdownTempStorageOld.sourceName || !sourceName) {
      throw new Error(`Invalid sourceName must not be empty and must not change in ${this.constructor.name}: ${sourceName}`);
    }
    const source = markdownTempStorageNew.getSource(sourceName);
    if (markdownTempStorageOld.getSource(sourceName) !== source) {
      // source changed in database (or got loaded for the first time)
      this.setState({source});
    }
  }

  save = () => {
    const { sourceName, markdownTempStorage, autoSaveThrottleDelay } = this.props;
    let { source } = this.state;
    markdownTempStorage.saveSourceThrottled(sourceName, source, autoSaveThrottleDelay);
  };

  render() {
    let { source } = this.state;
    if (source === NotLoaded) {
      return <Loading centered />;
    }
    if (source === null) {
      source = '';
    }
    return (
      <Flexbox className="full-width" flexDirection="column">
        {/* Editor + Preview */}
        <Flexbox className="full-width" flexDirection="row">
          <Flexbox className="full-width">
            <MarkdownEditor onChange={this.save} value={source} />
          </Flexbox>
          <Flexbox className="full-width">
            <MarkdownViewer source={source} />
          </Flexbox>
        </Flexbox>

        {/* Toolbar */}
        {/* <Flexbox className="full-width" flexDirection="row" justifyContent="space-evenly">
          <MUIButton className=""
            color="inherit"
            disabled={}
            onClick={this.save}>
            <span>Save</span>
          </MUIButton>
        </Flexbox> */}
      </Flexbox>);
  }
}

export default MarkdownEditorWithPreview;