import React, { Component } from "react";

export default class Fund extends Component {
  state = {
    theID: this.props.match.params.id
  };

  goToForm = (id) => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate(`/donate/${id}`)
    }
  };

  render() {
    let theFund = this.props.theFunds.find(
      theFund => theFund._id === this.state.theID
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
          <button onClick={() => this.goToForm(this.state.theID)}>Donate</button>
        </div>
      );
    } else {
      return <div>No data.</div>;
    }
  }
}
