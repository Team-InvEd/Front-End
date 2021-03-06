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
import Donate from "./components/donate/donate";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./graphics/leaf1.png";
import bgVideo from "./graphics/bgv.mp4";
import baseURL from "./services/url"


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
    // landing: false
  };

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    console.log(user);
    if (user.data.email) this.setState({ user: { ...user.data } });

    this.updateServer();
    let theTransactions = await axios.get(
      baseURL + "/api/transactions"
    );
    this.setState({ theTransactions: theTransactions.data });

    let theUsers = await axios.get(baseURL + "/api/users");
    this.setState({ theUsers: theUsers.data });
  }
  updateServer = async () => {
    const funds = await axios.get(baseURL + "/funds");
    this.setState({
      theFunds: funds.data.theFunds,
      filtered: funds.data.theFunds
    });
  };

  addCalcToUser = user => {
    this.setState({ user: user.data });
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
    this.interAction("Logged out successfully.", true);
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
    if (this.state.theFunds && this.state.theTransactions)
      return (
        <div>
          <nav className="navBox">
            <div className="leftNav">
              <NavLink to="/" className="btn btn-link leftNav">
                <img src={Logo} className="logo" />
                invEd
              </NavLink>
            </div>
            <div className="rightNav">
              {this.state.user ? (
                <span>
                  Logged in as{" "}
                  <NavLink to="/profile" className="btn-link">
                    {this.state.user.name}
                  </NavLink>
                </span>
              ) : null}
              <NavLink to="/about" className="btn-link navSpace">
                {" "}
                About
              </NavLink>{" "}
              {this.state.user ? (
                <NavLink
                  onClick={this.logOut}
                  to="/"
                  className="btn-link"
                  style={{ color: "red" }}
                >
                  {" "}
                  Log Out
                </NavLink>
              ) : (
                <Fragment>
                  <NavLink to="/log-in" className="btn-link navSpace">
                    {" "}
                    Log In{" "}
                  </NavLink>{" "}
                  <NavLink to="/sign-up" className="btn-link navSpace">
                    {" "}
                    Sign Up{" "}
                  </NavLink>
                </Fragment>
              )}{" "}
            </div>
          </nav>
          <br />{" "}
          <div className="mainBox">
            {this.state.message && (
              <div className="alert alert-success">
                <strong>Update: </strong>
                {this.state.message}
              </div>
            )}

            {this.state.error && (
              <div className="alert alert-danger">{this.state.error}</div>
            )}
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    user={this.state.user}
                    locate={this.locate}
                    changeLanding={this.changeLanding}
                  />
                )}
              />
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
                    addCalcToUser={this.addCalcToUser}
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
                    updateServer={this.updateServer}
                  />
                )}
              />
              <Route
                exact
                path="/about"
                render={props => <About {...props} />}
              />
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
          {/* <div id="container">
          <video
              autoPlay
              muted
              loop
              style={{
                position: "fixed",
                width: "100%",
                left: 0,
                top: 0
              }}
            >
              <source src={bgVideo} type="video/mp4" />
            </video> 
            </div> */}
        </div>
      );
    else return <div>Loading...</div>;
  }
}
Math.formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export default App;
