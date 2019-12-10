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
        <Link to="/donate">
          <button className="btn btn-success">Donate</button>
        </Link>{" "}
        <Link to="/create">
          <button className="btn btn-info">Create an InvEd Fund</button>
        </Link>
      </div>
    );
  }
}

export default Home;
