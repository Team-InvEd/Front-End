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
    return this.state.myStuff.data.theTransactions.map((res, i) => (
    <div key={i}>${res.amount} ------ {res.fundId.title} ({res.fundId.userName}) <Link to={"/fund/"+res.fundId._id}>go to</Link></div>
    ));
  };

  render() {
    console.log(this.state);
    if (this.state.myStuff)
      return (
        <div>
          Profile <br />
          {this.state.myStuff.data.theFunds.length ? (
            <div>My Funds: {this.showMyFunds()}</div>
          ) : null}
          {this.state.myStuff.data.theTransactions.length ? (
            <div>My Donations: {this.showMyDonations()}</div>
          ) : null}
        </div>
      );
    else {
      return <div>Loading...</div>;
    }
  }
}

export default Profile;
