import React, { Component, Fragment } from "react";
import actions from "../../services/index";
class LogIn extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = async e => {
    e.preventDefault();
    try {
      let user = await actions.logIn(this.state);
      this.props.setUser({ ...user.data });
      this.props.history.push("/");
      this.props.interAction("Logged In Successfully.", true);
    } catch (err) {
      console.log("=-=-=-=-=-", err.response.data);
      if (err.response.data === "Unauthorized") {
        this.props.interAction(
          "Email or password is incorrect, please check credentials and try again.",
          false
        );
      } else if (err.response.data === "Bad Request") {
        this.props.interAction(
          "Please make sure to enter an email and password.",
          false
        );
      } else {
        this.props.interAction("Unknown error. Please try again.", false);
      }
    }
  };

  render() {
    return (
      <Fragment>
        <h2>LogIn</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            placeholder="email address"
            type="email"
            onChange={this.handleChange}
          />{" "}
          <br />
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
          />{" "}
          <br />
          <input type="submit" value="Log In" />
        </form>
      </Fragment>
    );
  }
}

export default LogIn;
