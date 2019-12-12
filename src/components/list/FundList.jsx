import React from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom";

export default class FundList extends React.Component {
  state = {
    theFunds: [],
    filtered: []
  };

  componentDidMount = async () => {
    try {
      const funds = await axios.get("http://localhost:5000/funds");
      console.log(funds);
      this.setState({
        theFunds: funds.data.theFunds
      });
    } catch (err) {
      console.log(err);
    }
  };

  showFunds = () => {
    return this.state.filtered.map((res, i) => {
      console.log(res.title);
      return (
        <div key={i}>
          {res.title}
          <br />
          {res.amount}
          <br />
          {res.description}
          <br />
          <Link to="/donate">
            <button>Donate</button>
          </Link>
          <hr />
          <br />
        </div>
      );
    });
  };

  updateSearch = e => {
    let fList = this.state.theFunds.filter(eFund => {
      return eFund.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({
      filtered: fList
    });
  };
  render() {
    return (
      <React.Fragment>
        <Search search={this.updateSearch} />
        {this.showFunds()}
      </React.Fragment>
    );
  }
}
