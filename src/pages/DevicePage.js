import map from 'lodash/map';

import React, { Component } from 'react';

import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Devices from 'state/Devices';
import connect from 'connect';
import NotLoaded from 'NotLoaded';

import DevicePanel from 'components/DevicePanel';
import Loading from 'components/Loading';

@connect(Devices)
class DevicePage extends Component {
  render() {
    const { devices: { byId } } = this.props;
    if (byId === NotLoaded) {
      return <Loading centered />;
    }

    return (<div className="full-width">
      {map(byId, (dev, deviceId) => <DevicePanel deviceId={deviceId} />)}
    </div>);
  }
}

export default DevicePage;