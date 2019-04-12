import React, { Component } from 'react';

import { Button } from 'reactstrap';

import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Devices from 'state/Devices';
import connect from 'connect';
import NotLoaded from 'NotLoaded';

import Loading from 'components/Loading';


@connect(Devices)
class DevicePanel extends Component {
  toggleDoor = () => {
    const { deviceId, devices: { getNextStatus, setCommand } } = this.props;
    const status = getNextStatus(deviceId);

    setCommand(deviceId, !status);
  };

  render() {
    const { deviceId, size, devices: { getNextStatus } } = this.props;
    const status = getNextStatus(deviceId);

    if (status === NotLoaded) {
      return <Loading centered />;
    }

    const icon = status && faDoorOpen || faDoorClosed;
    const col = status && 'success' || 'danger';

    return (
      <div className="full-center full-height full-width">
        <Button className={size && ('font-size-'+size) || ''} 
          color={col} size="lg" onClick={this.toggleDoor}>
          <FontAwesomeIcon icon={icon} />
        </Button>
      </div>
    );
  }
}

export default DevicePanel;