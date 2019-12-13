import React, { Component, Fragment } from "react";
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
import Donate from "./components/donate/Donate.jsx";
import axios from "axios";
import {
  Redirect,
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";

class App extends Component {
  state = {
    where: "",
    user: null
  };

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    if (user.data.email) this.setState({ user: { ...user.data } });

    this.updateServer();
  }
  updateServer = async () => {
    const funds = await axios.get("http://localhost:5000/funds");
    this.setState({
      theFunds: funds.data.theFunds,
      filtered: funds.data.theFunds
    });
  };
  setUser = user => {
    this.setState({ user }, () => {
      if (this.state.where) {
        this.props.history.push(this.state.where);
        this.setState({ where: null });
      }
    });
  };

  logOut = async () => {
    await actions.logOut();
    this.setUser(null);
    this.setState({ user: null });
  };
  locate = exactly => {
    this.setState({
      where: exactly
    });
  };

  updateSearch = e => {
    let fList = this.state.theFunds.filter(eFund => {
      return eFund.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({
      filtered: fList
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.user ? <span>Hello {this.state.user.name}! </span> : null}
        <nav>
          <NavLink to="/">Home |</NavLink>
          <NavLink to="/about"> About |</NavLink>
          {this.state.user ? (
            <Fragment>
              <NavLink onClick={this.logOut} to="/">
                Log Out |{" "}
              </NavLink>
              <NavLink to="/profile"> Profile |</NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink to="/log-in"> Log In |</NavLink>
              <NavLink to="/sign-up"> Sign Up |</NavLink>
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
                theFunds={this.state.theFunds}
                filtered={this.state.filtered}
                showFunds={this.showFunds}
                updateSearch={this.updateSearch}
              />
            )}
          />
          <Route
            exact
            path="/donate"
            render={props => <Donate {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/fund/:id"
            render={props => (
              <Fund
                {...props}
                theFunds={this.state.theFunds}
                filtered={this.state.filtered}
                showFunds={this.showFunds}
                updateSearch={this.updateSearch}
              />
            )}
          />
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
            render={props => (
              <Form
                {...props}
                user={this.state.user}
                updateServer={this.updateServer}
              />
            )}
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
