import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AdView, EditAd, DeleteAd } from './ad';
import { Logout } from './user';
import Home from './home/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/edit/:id?" component={EditAd} />
          <Route path="/delete/:id" component={DeleteAd} />
          <Route path="/:id" component={AdView} />
        </Switch>
      </Router>
    );
  }
}

export default App;
