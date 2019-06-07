import isString from 'lodash/isString';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Users from 'features/users/api/Users';

import connect from 'connect';
import renderLoadingIfNotLoaded from 'components/renderLoadingIfNotLoaded';
import { withStyles } from '@material-ui/core';

const styles = {
  icon: {
    borderRadius: '50%'
  }
};


@withStyles(styles)
@connect(Users)
class UserIcon extends Component {
  render() {
    const s = this.props.classes;
    let { users, uid, size } = this.props;

    const user = users.getUser(uid);
    const loading = renderLoadingIfNotLoaded(user);
    if (loading) { return loading; }

    const { photoUrl } = user;

    let { customStyles } = this;
    if (!customStyles || (size && parseFloat(size) !== parseFloat(customStyles.maxSize))) {
      if (size && !isString(size)) {
        size += 'em';
      }
      customStyles = this.customStyles = {
        maxSize: size || '1em'
      };
    }

    return (<img src={photoUrl} style={customStyles} classNames={s.icon} alt=" " />);
  }
}

export default UserIcon;