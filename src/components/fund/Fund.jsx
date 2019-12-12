import React, { Component } from "react";

export default class Fund extends Component {
  render() {
    return (
      <div>
        This is the Fund component.
        <br />
        Title: {this.props.theFund.title}
      </div>
    );
  }
}
