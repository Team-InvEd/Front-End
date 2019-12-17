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
import Donate from "./components/donate/Donate";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
    user: null,
    theTransactions: null,
    theUsers: null,
    message: "",
    error: ""
  };

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    console.log(user);
    if (user.data.email) this.setState({ user: { ...user.data } });

    this.updateServer();
    let theTransactions = await axios.get(
      "http://localhost:5000/api/transactions"
    );
    this.setState({ theTransactions: theTransactions.data });

    let theUsers = await axios.get("http://localhost:5000/api/users");
    this.setState({ theUsers: theUsers.data });
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
  interAction = (str, ok) => {
    if (ok) {
      this.setState({ message: str, error: "" });
      setTimeout(() => this.setState({ message: "" }), 4000);
    } else {
      this.setState({ message: "", error: str });
      setTimeout(() => this.setState({ error: "" }), 4000);
    }
  };

  render() {
    console.log(this.state.theTransactions);
    console.log(this.state.theFunds);
    if (this.state.theFunds && this.state.theTransactions)
      return (
        <div>
          <nav>
            {this.state.user ? (
              <span>Hello {this.state.user.name}! </span>
            ) : null}
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
            <br />{" "}
            {this.state.message && (
              <div className="alert alert-success">{this.state.message}</div>
            )}
            {this.state.error && (
              <div className="alert alert-danger">{this.state.error}</div>
            )}
          </nav>
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route
              exact
              path="/sign-up"
              render={props => (
                <SignUp
                  {...props}
                  setUser={this.setUser}
                  interAction={this.interAction}
                />
              )}
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
                  transactions={this.state.theTransactions.theT}
                />
              )}
            />

            <Route
              exact
              path="/fund/:id"
              render={props => (
                <Fund
                  {...props}
                  user={this.state.user}
                  users={this.state.theUsers}
                  locate={this.locate}
                  theFunds={this.state.theFunds}
                  filtered={this.state.filtered}
                  showFunds={this.showFunds}
                  updateSearch={this.updateSearch}
                  transactions={this.state.theTransactions.theT}
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
              render={props => (
                <LogIn
                  {...props}
                  setUser={this.setUser}
                  interAction={this.interAction}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  {...props}
                  user={this.state.user}
                  transactions={this.state.theTransactions.theT}
                  theFunds={this.state.theFunds}
                  filtered={this.state.filtered}
                />
              )}
            />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route
              path="/donate/:id"
              render={props => (
                <Donate
                  {...props}
                  user={this.state.user}
                  interAction={this.interAction}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      );
    else return <div>loading</div>;
  }
}
export default App;
