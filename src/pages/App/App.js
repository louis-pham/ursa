import React from 'react';
import { Route, Switch, Link } from "react-router-dom";


import './App.css';

import Nav from "../../components/Nav/Nav";
import Landing from "../../components/Landing/Landing";
import Dashboard from "../../components/Dashboard/Dashboard";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import UserPage from "../UserPage/UserPage";
import About from "../About/About";
import Terms from "../Terms/Terms";
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
              !userService.getUser() ?
                <Landing />
                :
                <Dashboard user={this.state.user}/>
            )}
          />
          <Route
            exact
            path="/profile"
            render={({ history, match }) => (
              <ProfilePage match={match} user={this.state.user} history={history} />
            )}
          />
          <Route
            exact
            path="/profile/edit"
            render={({ history, match }) => (
              <EditProfilePage match={match} user={this.state.user} history={history} handleSignupOrLogin={this.handleSignupOrLogin} handleLogout={this.handleLogout}/>
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
          <Route
            exact
            path="/users/:username"
            render={({ history, match }) => (
              <UserPage match={match} user={this.state.user} history={history} />
            )}
          />
          <Route
            exact
            path="/about"
            render={({ history }) => (
              <About history={history} />
            )}
          />
          <Route
            exact
            path="/terms"
            render={({ history }) => (
              <Terms history={history} />
            )}
          />
        </Switch>
        <footer className="center">
          <span>Created by <a href="https://louispham.dev">Louis Pham</a></span>
          <div className="links">
            <Link to="/about">About</Link>
            <Link to="/terms">Terms</Link>
            <a href="https://github.com/louis-pham/ursa">Source Code</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
