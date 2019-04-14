import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MUIButton from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import { Button } from 'reactstrap';


import connect from 'connect';
import CurrentUser from 'state/CurrentUser';
import Users from 'state/Users';
import { logout } from 'api/auth';

import RoleId, { hasRole } from 'api/roles';
import { blue, pink, white } from '@material-ui/core/colors';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  routeBtn: {
    fontSize: '1.2em'
  },
  adminBtn: {
    lineHeight: 0
  }
};


@withStyles(styles)
@withRouter
class RouteBtn extends Component {
  render() {
    const s = this.props.classes;
    const { route, children, ...props } = this.props;

    let cl = 'animated-underline';
    if (this.props.location.pathname === route) {
      cl += ' active';
    }
    return (
      <MUIButton className={`${s.menuButton} ${s.routeBtn}`}
        color="inherit"
        component={Link} to={route}>
        <span className={cl}>{children}</span>
      </MUIButton>
    );
  }
}


@connect(CurrentUser)
@withStyles(styles)
class AdminPages extends React.Component {

  render() {
    if (!hasRole(this.props.currentUser.displayRole, 'Admin')) {
      return '';
    }

    return (<>
      <div className="divider-vertical" />
      <RouteBtn route={'/users'}>Users</RouteBtn>
    </>);
  }
}

@connect(CurrentUser)
@withStyles(styles)
class AdminTools extends React.Component {
  toggleAdmin = () => {
    if (!hasRole(this.props.currentUser.displayRole, 'Admin')) {
      this.props.currentUser.setDisplayRole(this.props.currentUser.role);
    }
    else {
      this.props.currentUser.setDisplayRole(RoleId.User);
    }
  };

  render() {
    if (!hasRole(this.props.currentUser.role, 'Admin')) {
      return '';
    }

    const s = this.props.classes;
    const active = hasRole(this.props.currentUser.displayRole, 'Admin');

    return (<>
      <Button
        className={s.adminBtn}
        onClick={this.toggleAdmin}
        color={active && 'success' || 'danger'}
        size="small"
      >
        <Icon >star</Icon>
      </Button>
    </>);
  }
}

@connect(CurrentUser)
class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, currentUser } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {/* <MuiThemeProvider theme={theme}> */}
        <AppBar position="static">
          <Toolbar>
            <RouteBtn route={'/'}>Home</RouteBtn>
            <RouteBtn route={'/learner'}>My Journey</RouteBtn>
            <RouteBtn route={'/learning-path'}>Choices</RouteBtn>
            {currentUser.uid && <AdminPages />}
            <div className={classes.grow} />
            {currentUser.uid && (
              <div>
                <AdminTools />
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <img className="size-15 rounded-circle" alt="account"
                    src={currentUser.photoURL} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {/* </MuiThemeProvider> */}
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);