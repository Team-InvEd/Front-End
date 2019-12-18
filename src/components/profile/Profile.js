import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
class Profile extends Component {
  state = {
    myStuff: null
  };
  async componentDidMount() {
    let myStuff = await Axios.get("http://localhost:5000/myStuff", {
      withCredentials: true
    });
    console.log(myStuff);
    this.setState({ myStuff });
  }

  showMyFunds = () => {
    return this.state.myStuff.data.theFunds.map((res, i) => (
      <Alert key={i} variant="success" className="thePanel">
        <span className="cash">${Math.formatNum(res.amount)}</span> for{" "}
        <Link to={"/fund/" + res._id}>{res.title}</Link>{" "}
        <span className="btn btn-link btn-sm deleteX">X</span>
      </Alert>
    ));
  };
  showMyDonations = () => {
    return this.state.myStuff.data.theTransactions.map((res, i) => {
      if (res.fundId) {
        return (
          <Alert key={i} variant="success" className="thePanel">
            <span className="cash">${Math.formatNum(res.amount)}</span> to{" "}
            <Link to={"/fund/" + res.fundId._id}>{res.fundId.title}</Link> (
            {res.fundId.userName})
          </Alert>
        );
      } else {
        return (
          <div key={i}>
            <span className="cash">${res.amount}</span> to{" "}
            <span className="removed">Fund is not longer exists. </span>
          </div>
        );
      }
    });
  };

  render() {
    if (this.state.myStuff)
      return (
        <div>
          Profile <br />
          {this.state.myStuff.data.theFunds.length > 0 ? (
            <div class="panel-group">
              <div class="panel panel-success">My </div> {this.showMyFunds()}
            </div>
          ) : (
            <div className="alert alert-secondary">
              {" "}
              You haven't created any funds yet.{" "}
            </div>
          )}
          {this.state.myStuff.data.theTransactions.length > 0 ? (
            <div class="panel-group">
              <div class="panel panel-success">My donations: </div>
              {this.showMyDonations()}
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
