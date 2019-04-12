import React, { Component } from 'react';

import DevicePanel from 'components/DevicePanel';

export default class Home extends Component {
  render() {
    return (<div className="full-width">
      <DevicePanel deviceId={'door1'} size="5" />
    </div>);
  }
}