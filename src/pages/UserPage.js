import React, { Component } from 'react';
import Moment from 'react-moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';

import Loading from 'components/Loading';

import connect from 'connect';
import Users from 'api/state/Users';

import { getRoleName, hasRole, RoleId } from 'api/roles';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  ava: {
    width: 'inherit',
    height: 'inherit'
  }
});


@connect(Users)
class UserAdminToggle extends Component {
  onChangePrivs = () => {
    const { uid, role, users } = this.props;
    users.setRole(uid, role >= RoleId.Admin ? RoleId.User : RoleId.Admin);
  };

  render() {
    const { role } = this.props;
    return (<Switch
      onChange={this.onChangePrivs}
      checked={hasRole(role, 'Admin')}
    />);
  }
}

@withStyles(styles)
@connect(Users)
class UsersList extends Component {
  onChangePrivs = (evt) => {
    console.log(evt);
  };

  render() {
    const s = this.props.classes;
    const { allUsers } = this.props.users;

    if (!allUsers) {
      return (<Loading centered />);
    }


    return (
      <List className={s.root}>
        {allUsers.map(user => (<ListItem key={user.uid}>
          <Avatar>
            <img className={s.ava} src={user.photoURL} alt="" />
          </Avatar>
          {/* <Moment date={user.createdAt.toDate()} /> */}
          <ListItemText primary={user.displayName}
            secondary={getRoleName(user.displayRole)} />
          <ListItemSecondaryAction>
            <UserAdminToggle {...user} />
          </ListItemSecondaryAction>
        </ListItem>))}
      </List>
    );
  }
}

export default function UserPage() {
  return (<div className="full-width">
    <UsersList />
  </div>);
}