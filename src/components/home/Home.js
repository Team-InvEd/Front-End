import React, { Component } from "react";
// import actions from "../../services/index";
import { Link } from "react-router-dom";
import Logo2 from "../../graphics/leaf1.png";
import { AiOutlineSearch } from "react-icons/ai";

class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div className="homeBox">
        <div className="leftHome">
          <span style={{ fontSize: "30px" }}>
            Free fundraising for the people and causes you care about.
          </span>
          <br />
          <br /> <br />
          <Link to="/funds">
            <button className="btn search">
              <AiOutlineSearch /> Search Funds
            </button>
          </Link>{" "}
          <Link to="/calculate">
            <button className="btn create">
              <img src={Logo2} className="logo2" />
              Create a new Fund
            </button>
          </Link>
          <br />
          {!this.props.user && (
            <div>
              Already a member?{" "}
              <Link to="/log-in">
                <span className="btn-link">Log in</span>
              </Link>{" "}
            </div>
          )}
        </div>
        <div className="rightHome"></div>
      </div>
    );
  }
}

export default Home;
