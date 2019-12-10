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
        InvEd
        <br />
        <Link to="/donate">
          <button>Donate</button>
        </Link>

        <Link to="/create">
        <button>Create an InvEd Fund</button>
        </Link>
        
      </div>
    );
  }
}

export default Home;
