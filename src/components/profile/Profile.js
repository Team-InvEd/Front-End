import React, { Component } from "react";
import Axios from "axios";

class Profile extends Component {
  async componentDidMount() {
    // if (!this.props.user.email) {
    //   this.props.history.push("/log-in");
    // }

    let myStuff = await Axios.get("http://localhost:5000/myStuff", {
      withCredentials: true
    });
    console.log(myStuff);
    this.setState({});
  }

  render() {
    return (
      <div>
        Profile <br />
        {/* Welcome {this.props.user.name} <br />
        Email: {this.props.user.email} */}
      </div>
    );
  }
}

export default Profile;
