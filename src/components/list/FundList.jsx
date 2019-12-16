import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

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
        <div key={i}>
          <Link to={"/fund/" + res._id}>{res.title}</Link>
          <br />
          {res.userId.name}
          <br />
          {res.amount}
          <br />
          {res.description}
          <br />
          <button onClick={() => this.goToForm(res._id)}>Donate</button>
          <hr />
          <br />
        </div>
      ));
    }
  };
  render() {
    return (
      <React.Fragment>
        <Search search={this.props.updateSearch} />
        {this.showFunds()}
      </React.Fragment>
    );
  }
}
