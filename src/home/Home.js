import React from 'react';
import { AdList } from '../ad';
import { User, Login } from '../user';
import { getFromLs } from '../utils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: getFromLs('isLoggedIn')
    };
  }
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? <User /> : <Login />}
        <AdList />
      </div>
    );
  }
}

export default Home;
