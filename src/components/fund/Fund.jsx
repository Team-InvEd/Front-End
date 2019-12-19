import React, { Component } from "react";
// import { IoMdArrowRoundForward } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

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
        <div className="fund-page">
        <div>
        <h3>{theFund.title}</h3> <br />
        <img
            src={theFund.imageUrl}
            alt=""
            className="fundImg"
          />
        </div>
        <div>
          
          <span className="cash">${Math.formatNum(theFund.amount)}</span>
        </div>
         
          <br />
          
          <br />
          {theFund.description}
          <br /> <hr />
          <br />
          <button onClick={() => this.goToForm(this.state.theID)}>
            <AiOutlineSafety /> Donate
          </button>
          <br />
          
          <div className="social-icons">
          <h5>Share this Fund</h5>
          <FacebookShareButton url={`http://localhost:3000/fund/${this.state.theID}`}><FacebookIcon size={50}/></FacebookShareButton>
          <LinkedinShareButton url={`http://localhost:3000/fund/${this.state.theID}`}><LinkedinIcon size={50}/></LinkedinShareButton>
          <TwitterShareButton url={`http://localhost:3000/fund/${this.state.theID}`}><TwitterIcon size={50}/></TwitterShareButton>
          <EmailShareButton url={`http://localhost:3000/fund/${this.state.theID}`}><EmailIcon size={50}/></EmailShareButton>
          </div>
          <div>
          Donations: {this.showDonations()}
          </div>
        </div>
      );
    } else {
      return <div>No data.</div>;
    }
  }
}
