import React, { Component } from "react";
import axios from "axios";
import { FaRegCommentAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";

export default class Donate extends Component {
  state = {
    amount: null,
    comment: "",
    showTextArea: false
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
      this.props.interAction(
        `Your donation of ${amount}$ has been recieved.`,
        true
      );
    } catch (err) {
      console.log(err);
      this.props.interAction(
        "The donation has not been recieved. Please fill all required fields and try again.",
        false
      );
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  toggleComment = () =>
    this.setState({ showTextArea: !this.state.showTextArea });
  render() {
    console.log(this.props);
    return (
      <div>
        <Card>
          <Card.Header>
            <h3>How much would you like to donate?</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <input
                onChange={this.handleChange}
                type="number"
                name="amount"
                placeholder="0.00$"
                className="amountInput"
              />{" "}
              <br />
              <button onClick={this.toggleComment}>
                <FaRegCommentAlt />
              </button>{" "}
              <br />
              <br />
              {this.state.showTextArea && (
                <textarea
                  className="shadow p-3 mb-5 bg-white rounded commentBox"
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  onChange={this.handleChange}
                />
              )}
            </Card.Text>
            {this.state.amount > 0 ? (
              <button onClick={this.submitDonation}>Place donation</button>
            ) : (
              <button disabled>Place donation</button>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
