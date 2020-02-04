import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Button color='inherit' component={Link} to='/events'>
            Events
          </Button>
          <Button color='inherit' component={Link} to='/bookings'>
            Bookings
          </Button>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
