import React, { Component, Fragment } from "react";
import {
  Redirect,
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./services/index";
import About from "./components/about/About";
import FundList from "./components/list/FundList";
import Calculate from "./components/calculate/Calculate";
import Form from "./components/fund/Form";
import Fund from "./components/fund/Fund";
import Donate from "./components/donate/donate";


class App extends Component {
  state = {
    where: ""
  };

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    this.setState({ user: { ...user.data } });
  }

  setUser = user => {
    this.setState({ user }, () => {
      if (this.state.where) {
        this.props.history.push(this.state.where);
        this.setState({ where: null });
      }
    });
  };

  logOut = async () => {
    // let res = await actions.logOut();
    this.setUser(null);
  };
  locate = exactly => {
    this.setState({
      where: exactly
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.user ? this.state.user.email : null}
        <nav>
          <NavLink to="/">Home |</NavLink>
          <NavLink to="/about"> About |</NavLink>
          {this.state.user ? (
            <Fragment>
              {this.state.user && (
                <NavLink onClick={this.logOut} to="/">
                  Log Out |
                </NavLink>
              )}
              <NavLink to="/profile">Profile|</NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink to="/sign-up">Sign Up |</NavLink>
              <NavLink to="/log-in">Log In |</NavLink>
            </Fragment>
          )}
        </nav>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/funds"
            render={props => (
              <FundList
                {...props}
                user={this.state.user}
                locate={this.locate}
              />
            )}
          />
          {/* <Route
            exact
            path="/donate"
            render={props => <Donate {...props} user={this.state.user} />}
          /> */}
          <Route exact path="/fund/:id" render={props => <Fund {...props} />} />
          <Route
            exact
            path="/calculate"
            render={props => (
              <Calculate
                {...props}
                user={this.state.user}
                locate={this.locate}
              />
            )}
          />

          <Route
            exact
            path="/form"
            render={props => <Form {...props} user={this.state.user} />}
          />

          <Route
            exact
            path="/log-in"
            render={props => <LogIn {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/profile"
            render={props => <Profile {...props} user={this.state.user} />}
          />
          <Route exact path="/about" render={props => <About {...props} />} />
          <Route
            path="/donate/:id"
            render={props => <Donate {...props} user={this.state.user} />}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
export default App;
