import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeUserLogin');
    this.props.history.push('/');
  }

  render() {
    return <div />;
  }
}

export default Logout;
