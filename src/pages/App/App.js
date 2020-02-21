import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';
import Nav from "../../components/Nav/Nav";
import Landing from "../../components/Landing/Landing";
import Dashboard from "../../components/Dashboard/Dashboard";
// user-related pages
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import UserPage from "../UserPage/UserPage";
import UserDirectory from "../UserDirectory/UserDirectory";
// poll-related pages
import CreatePollPage from "../CreatePollPage/CreatePollPage";
import PollPage from "../PollPage/PollPage";
// misc. pages
import About from "../About/About";
import Terms from "../Terms/Terms";
import userService from '../../utils/userService';

toast.configure();

const errorTypes = {
  error: toast.TYPE.ERROR,
  warning: toast.TYPE.WARNING,
  info: toast.TYPE.INFO,
  success: toast.TYPE.SUCCESS,
  default: toast.TYPE.DEFAULT,
};

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

  notify = (type, msg) => toast(msg, {type: errorTypes[type]});

  render() {
    return (
      <div className="App">
        <ToastContainer />
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
                <Dashboard user={this.state.user} notify={this.notify}/>
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
              <EditProfilePage match={match} user={this.state.user} history={history} handleSignupOrLogin={this.handleSignupOrLogin} handleLogout={this.handleLogout}
              notify={this.notify}/>
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} notify={this.notify} />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} notify={this.notify}/>
            )}
          />
          <Route
            exact
            path="/users"
            render={({ history, match }) => (
              <UserDirectory match={match} user={this.state.user} history={history} notify={this.notify} />
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
            path="/polls/create"
            render={({ history, match }) => (
              <CreatePollPage match={match} user={this.state.user} history={history} notify={this.notify} />
            )}
          />
          <Route
            exact
            path="/polls/:id"
            render={({ history, match }) => (
              <PollPage match={match} user={this.state.user} history={history} notify={this.notify} />
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
