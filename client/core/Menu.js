import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddBoxRounded';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#2e7d32', // Green color for the app bar
    position: 'sticky',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    color: '#ffffff', // White color for the title text
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
  iconButton: {
    color: '#ffffff', // White color for icons
  },
  activeIconButton: {
    color: '#69f0ae', // Light green color for active icons
  },
  button: {
    marginRight: theme.spacing(2),
    borderRadius: 20,
    textTransform: 'none',
  },
  activeButton: {
    color: '#fffde7', // Yellowish color for active buttons
    backgroundColor: '#2bbd7e', // Green color for active button background
  },
  inactiveButton: {
    color: '#2bbd7e', // Green color for inactive buttons
    backgroundColor: '#ffffff', // White background for inactive buttons
    border: '1px solid #2bbd7e',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

const isActive = (history, path, classes) => {
  if (history.location.pathname === path) {
    return { className: classes.activeIconButton };
  } else {
    return { className: classes.iconButton };
  }
};

const isButtonActive = (history, path, classes) => {
  if (history.location.pathname.includes(path)) {
    return { className: `${classes.button} ${classes.activeButton}` };
  } else {
    return { className: `${classes.button} ${classes.inactiveButton}` };
  }
};

const Menu = withRouter(({ history }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          SPEND SMART
        </Typography>
        <div>
          <Link to="/" className={classes.link}>
            <IconButton aria-label="Home" {...isActive(history, "/", classes)}>
              <HomeIcon />
            </IconButton>
          </Link>
          {auth.isAuthenticated() && (
            <span>
              <Link to="/expenses/all" className={classes.link}>
                <Button {...isActive(history, "/expenses/all", classes)}>
                  Expenses
                </Button>
              </Link>
              <Link to="/expenses/reports" className={classes.link}>
                <Button {...isActive(history, "/expenses/reports", classes)}>
                  Reports
                </Button>
              </Link>
            </span>
          )}
        </div>
        <div className={classes.buttonContainer}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup" className={classes.link}>
                <Button {...isActive(history, "/signup", classes)}>
                  Sign up
                </Button>
              </Link>
              <Link to="/signin" className={classes.link}>
                <Button {...isActive(history, "/signin", classes)}>
                  Sign In
                </Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              <Link to="/expenses/new" className={classes.link}>
                <Button {...isButtonActive(history, "/expenses/new", classes)}>
                  <AddIcon style={{ marginRight: 4 }} /> Add Expense
                </Button>
              </Link>
              <Link to={`/user/${auth.isAuthenticated().user._id}`} className={classes.link}>
                <Button {...isActive(history, `/user/${auth.isAuthenticated().user._id}`, classes)}>
                  My Profile
                </Button>
              </Link>
              <Button
                className={classes.button}
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push('/'));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
