/**
 * Based on: https://github.com/fabiospampinato/unstated-with-containers/blob/master/src/index.tsx
 */

import React from 'react';
import { Subscribe, Container } from 'unstated';
import zipObject from 'lodash/zipObject';
import isPlainObject from 'lodash/isPlainObject';

/**
 * HOC decorator for Unstated (behaving similar to Redux's connect).
 */
export default function unstatedConnect(...input) {
  const C = Container;
  let ContainerTypes;
  let ContainerNames;
  if (input[0].prototype instanceof Container) {
    ContainerTypes = input;
    ContainerNames = ContainerTypes.map(c => {
      if (!c.n) {
        throw new Error(c + ' Container must (but did not) define `static n` property (indicating the name its data gets assigned when added as a property)');
      }
      return c.n;
    });
  }
  else if (isPlainObject(input[0])) {
    const config = input[0];

    ContainerNames = Object.keys(config);
    ContainerTypes = ContainerNames.map(name => config[name]);
  }
  else {
    throw new Error('Invalid unstatedConnect call: Arguments must be Containers or a single object');
  }

  return function unstatedConnectWrapper(WrappedComponent) {
    return class ContainersProvider extends React.Component {
      doRender = (...containers) => {
        const containerProps = zipObject(ContainerNames, containers.map(c => c.state));
        return (
          <WrappedComponent {...containerProps} {...this.props} />
        );
      };

      render() {
        return (
          <Subscribe to={ContainerTypes}>
            {this.doRender}
          </Subscribe>
        );
      }
    }
  };
}