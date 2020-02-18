import React from 'react';
import { Route, Switch } from "react-router-dom";


import './App.css';

import Nav from "../../components/Nav/Nav";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from '../../utils/userService';

class App extends React.Component {
  state = {
    user: userService.getUser()
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>Whattup</div>
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
