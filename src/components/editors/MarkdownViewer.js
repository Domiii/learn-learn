import React, { PureComponent } from 'react';

import ReactMarkdown from 'react-markdown';
//import htmlParser from 'react-markdown/plugins/html-parser';

class MarkdownViewer extends PureComponent {
  state = {}

  render() {
    const { source, ...otherProps } = this.props;

    // // See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
    // // for more info on the processing instructions
    // const parseHtml = htmlParser({
    //   isValidNode: node => node.type !== 'script',
    //   processingInstructions: [/* ... */]
    // })

    return (<ReactMarkdown
      source={source}
      {...otherProps}
    /> );
  }
}

export default MarkdownViewer;