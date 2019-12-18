import React, { Component } from "react";
// import { IoMdArrowRoundForward } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";

export default class Fund extends Component {
  state = {
    theID: this.props.match.params.id
  };

  goToForm = id => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate(`/donate/${id}`);
    }
  };

  showDonations = () => {
    let theTransactions = this.props.transactions.filter(
      eachT => eachT.fundId === this.props.match.params.id
    );

    console.log(this.props.transactions);
    // let theUsers = this.props.users.find(
    //   eachU => eachU._id === theTransactions.userId
    // )

    // console.log(theUsers)

    return theTransactions.map((res, i) => (
      <div key={i}>
        <span className="cash">${res.amount} </span> from {res.userId.name}
        <br />
        {res.comment}
        <hr />
      </div>
    ));
  };

  render() {
    let theFund = this.props.theFunds.find(
      theFund => theFund._id === this.state.theID
    );

    if (theFund) {
      return (
        <div>
          <br />
          <h3>{theFund.title}</h3>
          <br />
          <img
            src={theFund.imageUrl}
            width="200px"
            alt=""
            className="fundImg"
          />
          <br />
          <span className="cash">${Math.formatNum(theFund.amount)}</span>
          <br />
          {theFund.description}
          <br /> <hr />
          Donations: {this.showDonations()}
          <br />
          <button onClick={() => this.goToForm(this.state.theID)}>
            <AiOutlineSafety /> Donate
          </button>
          <br />
          <br />
          {/* <div>{theFund.comment} </div> */}
        </div>
      );
    } else {
      return <div>No data.</div>;
    }
  }
}
