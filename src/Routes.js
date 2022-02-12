import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}
