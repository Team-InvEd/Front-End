import React, { Component } from "react";
// import actions from "../../services/index";
import { Link } from "react-router-dom";
import Logo2 from "../../graphics/leaf1.png";
import { AiOutlineSearch } from "react-icons/ai";

export default class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  goToForm = () => {
    if (this.props.user) {
      this.props.history.push("/calculate");
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/calculate");
    }
  };

  render() {
    return (
      <div className="homeBox">
        <div className="leftHome">
          <span style={{ fontSize: "30px", color: "grey" }}>
            Education savings and fundraising made easy.
          </span>
          <br />
          <br /> <br />
          <Link to="/funds">
            <button className="btn search">
              <AiOutlineSearch /> Search Funds
            </button>
          </Link>{" "}
          <button onClick={this.goToForm} className="btn create">
            <img src={Logo2} className="logo2" />
            Create a new Fund
          </button>
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
