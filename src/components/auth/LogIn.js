import React, { Component, Fragment } from "react";
import actions from "../../services/index";
class LogIn extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    let user = await actions.logIn(this.state);
    this.props.setUser({ ...user.data });
    this.props.history.push("/");
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
