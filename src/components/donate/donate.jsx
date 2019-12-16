import React, { Component } from "react";
import axios from "axios";

export default class Donate extends Component {
  state = {
    amount: null,
    comment: ""
  };
  submitDonation = async () => {
    const amount = this.state.amount;
    const userId = this.props.user._id;
    const fundId = this.props.match.params.id;
    const comment = this.state.comment;
    console.log(fundId);
    try {
      const x = await axios.post("http://localhost:5000/donate", {
        amount,
        userId,
        fundId,
        comment
      });
      this.props.history.push("/funds");
    } catch (err) {
      console.log(err);
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        Donate comp
        <br />
        <input
          onChange={this.handleChange}
          type="number"
          name="amount"
          placeholder="amount"
        />{" "}
        <br /> <br />
        <textarea
          type="text"
          name="comment"
          placeholder="Comment"
          onChange={this.handleChange}
        />{" "}
        <br /> <br />
        {this.state.amount > 0 ? (
          <button onClick={this.submitDonation}>Send Donation</button>
        ) : (
          <button disabled>Send Donation</button>
        )}
      </div>
    );
  }
}
