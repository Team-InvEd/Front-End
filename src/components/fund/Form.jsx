import React, { Component } from "react";
import axios from "axios";
import Fund from "./Fund";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: 0,
      description: "",
      showForm: true,
      showFund: false
      // picture: ""
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const amount = this.state.amount;
    const user = this.props.user;

    // const picture = this.state.picture;
    try {
      const x = await axios.post("http://localhost:5000/fund", {
        user,
        title,
        description,
        amount
      }, {withCredentials:true});
      console.log(x);
      // this.props.getData();
      this.setState(
        {
          title: x.data.title,
          amount: x.data.amount,
          description: x.data.description,
          showForm: false,
          showFund: true
        },
        () => {
          this.props.updateServer();

          this.props.history.push(`/fund/${x.data._id}`);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {this.state.showForm ? (
          <form onSubmit={this.handleFormSubmit}>
            <label>Fund Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />{" "}
            <br />
            <label>Fund Goal Amount $</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={e => this.handleChange(e)}
            />{" "}
            <br />
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />{" "}
            <br />
            {/* <label>Picture</label>
            <input
              type="text"
              name="picture"
              value={this.state.picture}
              onChange={e => this.handleChange(e)}
            />{" "}
            <br /> */}
            <button type="submit">Create InVed Fund</button>
          </form>
        ) : null}
      </div>
    );
  }
}
