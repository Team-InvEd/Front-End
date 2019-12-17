import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    myStuff: null
  };
  async componentDidMount() {
    // if (!this.props.user.email) {
    //   this.props.history.push("/log-in");
    // }

    let myStuff = await Axios.get("http://localhost:5000/myStuff", {
      withCredentials: true
    });
    console.log(myStuff);
    this.setState({ myStuff });
  }

  showMyFunds = () => {
    return this.state.myStuff.data.theFunds.map((res, i) => (
      <div key={i}>
        <Link to={"/fund/" + res._id}>{res.title}</Link>
      </div>
    ));
  };
  showMyDonations = () => {
    console.log(this.state.myStuff.data);
    return this.state.myStuff.data.theTransactions.map((res, i) => {
      if (res.fundId) {
        return (
          <div key={i}>
            ${res.amount} ------ {res.fundId.title} ({res.fundId.userName}){" "}
            <Link to={"/fund/" + res.fundId._id}>go to</Link>
          </div>
        );
      } else {
        return <div key={i}>${res.amount} ------ Fund has been removed. </div>;
      }
    });
  };

  render() {
    console.log(this.state);
    if (this.state.myStuff)
      return (
        <div>
          Profile <br />
          <div>My Funds: {this.showMyFunds()}</div>
          <div>My Donations: {this.showMyDonations()}</div>
        </div>
      );
    else {
      return <div>Loading...</div>;
    }
  }
}

export default Profile;
