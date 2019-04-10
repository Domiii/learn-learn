import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import connect from 'connect';
import UserProfiles from 'api/state/UserProfiles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  ava: {
    width: 'inherit',
    height: 'inherit'
  }
});


@withStyles(styles)
@connect(UserProfiles)
class UsersList extends Component {
  render() {
    const s = this.props.classes;
    return (
      <List className={s.root}>
        <ListItem>
          <Avatar>
            <img className={s.ava} src="" alt="" />
          </Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
    );
  }
}

export default function UserPage() {
  return (<div>
    <UsersList />
  </div>);
}