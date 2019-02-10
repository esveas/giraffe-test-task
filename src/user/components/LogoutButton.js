import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Logout = () => {
  return (
    <Link to="/logout">
      <Button variant="outlined" className={'logout'}>
        Log Out
      </Button>
    </Link>
  );
};

Logout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logout);
