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
    return this.state.myStuff.data.theTransactions.map((res, i) => {
      if (res.fundId) {
        return (
          <div key={i}>
            <span className="cash">${res.amount}</span> ------{" "}
            <Link to={"/fund/" + res.fundId._id}>{res.fundId.title}</Link> (
            {res.fundId.userName})
          </div>
        );
      } else {
        return (
          <div key={i}>
            <span className="cash">${res.amount}</span> ------{" "}
            <span style={{ fontStyle: "italic", color: "grey" }}>
              Fund has been removed.{" "}
            </span>
          </div>
        );
      }
    });
  };

  render() {
    console.log(this.state.myStuff);
    if (this.state.myStuff)
      return (
        <div>
          Profile <br />
          {this.state.myStuff.data.theFunds.length > 0 ? (
            <div className="alert alert-dark">
              My Funds: {this.showMyFunds()}
            </div>
          ) : (
            <div className="alert alert-secondary">
              {" "}
              You haven't created any funds yet.{" "}
            </div>
          )}
          {this.state.myStuff.data.theTransactions.length > 0 ? (
            <div className="alert alert-dark">
              My Donations: {this.showMyDonations()}
            </div>
          ) : (
            <div className="alert alert-secondary">
              {" "}
              You haven't made any donations yet.{" "}
            </div>
          )}
        </div>
      );
    else {
      return <div>Loading Profile...</div>;
    }
  }
}

export default Profile;
