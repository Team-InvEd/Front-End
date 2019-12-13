import React from "react";
import axios from "axios";
import Search from "./Search";
// import { Link } from "react-router-dom";

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
  goToForm = id => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/donate");
    }
  };
  showFunds = () => {
    if (this.state.filtered.length) {
      return this.state.filtered.map((res, i) => (
        <div key={i}>
          {res.title}
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
    } else {
      return this.state.theFunds.map((res, i) => {
        return (
          <div key={i}>
            {res.title}
            <br />
            {res.amount}
            <br />
            {res.description}
            <br />
            <button onClick={() => this.goToForm(res._id)}>Donate</button>
            <hr />
            <br />
          </div>
        );
      });
    }
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
