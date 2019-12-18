import React, { Component } from "react";
// import actions from "../../services/index";
import { Link } from "react-router-dom";

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
            <button className="btn btn-success">Search Funds</button>
          </Link>{" "}
          <Link to="/calculate">
            <button className="btn btn-info">Get Started</button>
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
        <div className="rightHome"> 
        
        </div>
      </div>
    );
  }
}

export default Home;
