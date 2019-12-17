import React, { Component, Fragment } from "react";
import actions from "../../services/index";

class SignUp extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let user = await actions.signUp(this.state);
      this.props.setUser({ ...user.data });
      this.props.history.push("/");
      this.props.interAction(
        "You've been successfully registered and logged in.",
        true
      );
    } catch (err) {
      this.props.interAction(
        "Unexpected error. Please try again later.",
        false
      );
    }
  };
  render() {
    return (
      <Fragment>
        <h2>SignUP</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Email address"
            name="email"
            type="email"
            onChange={this.handleChange}
          />
          <br />
          <input
            name="name"
            placeholder="name"
            type="text"
            onChange={this.handleChange}
          />{" "}
          <br />
          <input
            placeholder="password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />{" "}
          <br />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
