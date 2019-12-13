import React, { Component } from "react";

export default class Fund extends Component {
  state = {
    theID: this.props.match.params.id
  };
  render() {
    let theFund = this.props.theFunds.find(
      theFund => theFund._id == this.state.theID
    );
    if (theFund) {
      return (
        <div>
          This is the Fund component.
          <br />
          Title: {theFund.title}
          <br />
          Amount: {theFund.amount}
          <br />
          Description: {theFund.description}
          <br />
        </div>
      );
    } else {
      return <div>No data.</div>;
    }
  }
}
