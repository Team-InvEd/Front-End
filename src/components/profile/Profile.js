import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import baseURL from '../../services/url'


class Profile extends Component {
  state = {
    myStuff: null
  };

  componentDidMount = () => this.updateLocally();

  updateLocally = async () => {
    let myStuff = await axios.get(baseURL + "/myStuff", {
      withCredentials: true
    });
    this.setState({ myStuff });
    this.props.updateServer();
  };

  showMyFunds = () => {
    return this.state.myStuff.data.theFunds.map((res, i) => (
      <Alert key={i} variant="success" className="thePanel">
        <span className="cash">${Math.formatNum(res.amount)}</span> for{" "}
        <Link to={"/fund/" + res._id}>{res.title}</Link>{" "}
        <span
          className="btn btn-link btn-sm deleteX"
          onClick={() => this.deleteMyFund(res._id)}
        >
          X
        </span>
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
          <Alert variant="success" className="thePanel" key={i}>
            <span className="cash">${res.amount}</span> to{" "}
            <span className="removed">Fund is not longer exists.</span>
          </Alert>
        );
      }
    });
  };
  deleteMyFund = async id => {
    try {
      let x = await axios.post(
        baseURL + "/fund/delete",
        { id },
        { withCredentials: true }
      );

      this.updateLocally();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.myStuff)
      return (
        <div>
          Profile <br />
          {this.state.myStuff.data.theFunds.length > 0 ? (
            <div className="panel-group">
              <div>My Funds:</div> {this.showMyFunds()}
            </div>
          ) : (
            <Alert variant="light" className="removed">
              You haven't created any funds yet.
            </Alert>
          )}
          {this.state.myStuff.data.theTransactions.length > 0 ? (
            <div className="panel-group">
              <div>My donations: </div>
              {this.showMyDonations()}
            </div>
          ) : (
            <Alert variant="success" className="thePanel">
              You haven't made any donations yet.
            </Alert>
          )}
        </div>
      );
    else {
      return <div>Loading Profile...</div>;
    }
  }
}

export default Profile;
