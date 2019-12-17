import React, { Component } from "react";
import axios from "axios";
import Fund from "./Fund";
import service from "../../api/service"

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: 0,
      description: "",
      showForm: true,
      showFund: false,
      imageUrl: ""
      // picture: ""
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const amount = this.state.amount;
    const user = this.props.user;
    const imageUrl = this.state.imageUrl

    // const picture = this.state.picture;
    try {
      const x = await axios.post("http://localhost:5000/fund", {
        user,
        title,
        description,
        amount,
        imageUrl
      }, {withCredentials:true});
      console.log(x);
      // this.props.getData();
      this.setState(
        {
          title: x.data.title,
          amount: x.data.amount,
          description: x.data.description,
          imageUrl: x.data.imageUrl,
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


  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url } );
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}



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
            <label>Picture</label>
            <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 

            <button type="submit">Create InVed Fund</button>
          </form>
        ) : null}
      </div>
    );
  }
}
