import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/second-page">
          Second Page
        </Button>
        <Button color="inherit" component={Link} to="/departments">
          Departments
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
