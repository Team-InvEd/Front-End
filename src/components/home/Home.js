import React, { Component } from "react";
// import actions from "../../services/index";
import { Link } from "react-router-dom";

class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div>
        <h1>InvEd</h1>
        <br />
        <Link to="/funds">
          <button className="btn btn-success">Search Funds</button>
        </Link>{" "}
        <Link to="/calculate">
          <button className="btn btn-info">Get Started</button>
        </Link>
      </div>
    );
  }
}

export default Home;
