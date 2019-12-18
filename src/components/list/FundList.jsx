import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AiOutlineSafety } from "react-icons/ai";

export default class FundList extends React.Component {
  goToForm = id => {
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
            <p className="card-text">{res.description}</p>
            <button onClick={() => this.goToForm(res._id)}>
              <AiOutlineSafety /> Donate
            </button>
          </div>
        </div>
      ));
    }
  };
  render() {
    return (
      <React.Fragment>
        <Search search={this.props.updateSearch} />
        <div style={{ display: "flex" }}>{this.showFunds()}</div>
      </React.Fragment>
    );
  }
}
