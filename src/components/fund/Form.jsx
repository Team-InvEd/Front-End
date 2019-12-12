import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: 0,
      description: "",
      // picture: ""
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const amount = this.state.amount;
    const user = this.props.user
    // const picture = this.state.picture;
    
    axios
      .post("http://localhost:5000/fund", { user, title, description, amount })
      .then(() => {
        // this.props.getData();
        this.setState({ title: "", amount: 0, description: ""});
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
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
            type="text"
            name="goal"
            value={this.state.goal}
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
          <label>Picture</label>
          <input
            type="text"
            name="picture"
            value={this.state.picture}
            onChange={e => this.handleChange(e)}
          />{" "}
          <br />
          <button type="submit">Create InVed Fund</button>
        </form>
      </div>
    );
  }
}
