import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AiOutlineSafety } from "react-icons/ai";
import Logo2 from "../../graphics/leaf1.png";

export default class FundList extends React.Component {
  goToDonate = id => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/donate");
    }
  };


  componentDidMount = () => {};
  showFunds = () => {
    if (this.props.filtered.length) {
      return this.props.filtered.map((res, i) => (
        <div
          className="card bg-light mb-3 wrapFund"
          style={{ margin: "20px", width: "400px" }}
          key={i}
        >
          <div className="card-header">
            <Link to={"/fund/" + res._id}>{res.title}</Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {res.userId.name}{" "}
              <span className="cash">${Math.formatNum(res.amount)}</span>
            </h5>
            <span className="card-text">{res.description}</span> <br />
            <br />
            <button onClick={() => this.goToDonate(res._id)}>
              <AiOutlineSafety /> Donate
            </button>
          </div>
        </div>
      ));
    }
  };
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
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            align: "0 auto",
            width: "900px !important",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              align: "0 auto",
              width: "900px !important",
              justifyContent: "space-between"
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <Search search={this.props.updateSearch} />
            </div>
            <div>
              <button onClick={this.goToForm} className="btn create">
                <img src={Logo2} className="logo2" />
                Create a new Fund
              </button>
            </div>
          </div>
          <div
            style={{
              flexWrap: "wrap",
              align: "0 auto",
              width: "900px !important"
            }}
          >
            {this.showFunds()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/*


<div style={{ display: "flex", justifyContent: "center" }}>
          <div></div>
          <div
            style={{ align: "0 auto", display: "flex", flexDirection: "row" }}
          >
            {" "}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              align: "0 auto !important"
            }}
          >
            
          </div>
        </div>
      </React.Fragment>


*/
