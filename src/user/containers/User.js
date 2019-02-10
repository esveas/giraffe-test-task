import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import LogoutButton from '../components/LogoutButton';
import { getFromLs } from '../../utils';
import './User.css';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <Link to="/edit">
          <Button id="change" variant="outlined">
            Create Ad
          </Button>
        </Link>

        <Typography component="h2" variant="display1" gutterBottom>
          {getFromLs('activeUserLogin')}
        </Typography>
        <LogoutButton />
      </div>
    );
  }
}

export default UserView;
