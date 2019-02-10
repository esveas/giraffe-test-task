import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { getFromLs, setToLs } from '../../utils';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    marginTop: '30px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  typography: {
    marginTop: '30px'
  },
  warning: {
    color: '#f44336',
    paddingTop: '25px'
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLogin: null,
      sessionPassword: null,
      empty: null,
      wrongPwd: null,
      userData: getFromLs('userData')
    };
  }
  // set sessionLogin
  onLoginChange = event => {
    this.setState({ sessionLogin: event.target.value });
  };
  // set sessionPassword
  onPasswordChange = event => {
    this.setState({ sessionPassword: event.target.value });
  };
  // linefeed on Enter to password field
  onLoginEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('filled-password-input').focus();
    }
  };
  // sign in on Enter in Password field
  onPasswordEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('signIn').click();
    }
  };
  // Log In on button press
  onSignIn = () => {
    let userIsInLs = this.state.userData
      ? this.state.userData.find(user => {
          return user.login === this.state.sessionLogin;
        })
      : false;

    if (this.state.sessionLogin && this.state.sessionPassword) {
      if (!userIsInLs) {
        setToLs('userData', [
          {
            id: this.state.userData === null ? 0 : this.state.userData.length,
            login: this.state.sessionLogin,
            password: this.state.sessionPassword
          },
          ...(getFromLs('userData') || [])
        ]);
        this.setState({ empty: false }, () => {
          setToLs('isLoggedIn', true);
          setToLs('activeUserLogin', this.state.sessionLogin);
        });
        window.location.reload();
      } else if (userIsInLs.password === this.state.sessionPassword) {
        setToLs('isLoggedIn', true);
        setToLs('activeUserLogin', this.state.sessionLogin);
        window.location.reload();
      } else {
        this.setState({ wrongPwd: true }, () => {
          setTimeout(() => {
            this.setState({ wrongPwd: false });
          }, 3000);
        });
      }
    } else {
      this.setState({ empty: true }, () => {
        setTimeout(() => {
          this.setState({ empty: false });
        }, 3000);
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="loginForm">
        <Typography
          className={classes.typography}
          component="h2"
          variant="display1"
        >
          Authorization
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            autoFocus={true}
            id="filled-name"
            label="Login"
            className={classes.textField}
            value={this.state.name}
            margin="normal"
            onChange={this.onLoginChange}
            onKeyPress={this.onLoginEnterPressed}
          />
        </form>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="filled-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.onPasswordChange}
            onKeyPress={this.onPasswordEnterPressed}
          />
        </form>
        <Link to="/">
          <Button
            id="signIn"
            onClick={this.onSignIn}
            variant="outlined"
            className={classes.button}
          >
            Log In
          </Button>
        </Link>
        {this.state.empty && (
          <Typography className={classes.warning} variant="subheading">
            Tip: all fields must be filled in
          </Typography>
        )}

        {this.state.wrongPwd && (
          <Typography className={classes.warning} variant="subheading">
            Warning: wrong password
          </Typography>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
